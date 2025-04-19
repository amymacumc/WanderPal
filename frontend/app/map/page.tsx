'use client';
import React, { useEffect, useState } from 'react';

declare global {
  interface Window {
    _AMapSecurityConfig?: {
      securityJsCode: string;
    };
  }
}

// Define the route data structure
interface RoutePoint {
  position: [number, number];
  day: number;
  order: number;
  name: string;
}

export default function MapPage() {
  // Sample route data - you would replace this with your actual data
  const routes: RoutePoint[] = [
    { position: [116.397428, 39.90923], day: 1, order: 1, name: "Location 1" },
    { position: [116.407428, 39.91923], day: 1, order: 2, name: "Location 2" },
    { position: [116.417428, 39.90923], day: 2, order: 2, name: "Location 3" },
    { position: [116.427428, 39.91923], day: 2, order: 1, name: "Location 4" },
  ];

  // Color mapping for different days
  const dayColors = {
    1: '#4285f4', // Blue for Day 1
    2: '#00ffff', // Cyan for Day 2
    3: '#ff69b4', // Pink for Day 3
    4: '#00ff00', // Green for Day 4
    5: '#9370db', // Purple for Day 5
  };

  // Sample distances for each day (you would calculate or provide these)
  const dayDistances = {
    1: '19km',
    2: '10km',
    3: '10km',
    4: '10km',
    5: '10km',
  };

  useEffect(() => {
    if(typeof window !== 'undefined') {
      import('@amap/amap-jsapi-loader').then((AMapLoader) => {
        window._AMapSecurityConfig = {
          securityJsCode: process.env.NEXT_PUBLIC_AMAP_SECURITY_CODE || '',
        };
        
        AMapLoader.load({
          key: process.env.NEXT_PUBLIC_AMAP_KEY || '',
          version: '2.0',
          plugins: ['AMap.Geolocation', 'AMap.Text', 'AMap.Polyline', 'AMap.Walking', 'AMap.DragRoute'],
        }).then((AMap) => {
          const map = new AMap.Map('map-container', {
            viewMode: '2D',
            zoom: 13,
            zooms: [13, 13], // Lock zoom level
            center: routes[0].position,
            scrollWheel: false, // Disable mouse wheel zoom
            keyboardEnable: false, // Disable keyboard controls
            touchZoom: false, // Disable pinch zoom on mobile
            doubleClickZoom: false, // Disable double-click zoom
            zoomEnable: false, // Disable all zoom interactions
          });

          // Group routes by day
          const routesByDay = routes.reduce((acc, point) => {
            if (!acc[point.day]) acc[point.day] = [];
            acc[point.day].push(point);
            return acc;
          }, {} as Record<number, RoutePoint[]>);

          // Process each day's routes
          Object.entries(routesByDay).forEach(([day, dayPoints]) => {
            const color = dayColors[Number(day) as keyof typeof dayColors];
            const distance = dayDistances[Number(day) as keyof typeof dayDistances];
            
            // Sort points by order
            const sortedPoints = dayPoints.sort((a, b) => a.order - b.order);
            console.log('sortedPoints', sortedPoints);

            // Calculate label position based on first two points
            const firstPoint = sortedPoints[0].position;
            const labelPosition: [number, number] = [...firstPoint];
            
            if (sortedPoints.length > 1) {
              const secondPoint = sortedPoints[1].position;
              // If second point is above first point (higher latitude), place label below
              // If second point is below first point (lower latitude), place label above
              const verticalOffset = secondPoint[1] > firstPoint[1] ? -0.005 : 0.005;
              console.log('verticalOffset', verticalOffset);
              labelPosition[1] += verticalOffset;
              // Add slight horizontal offset to the left
              labelPosition[0] -= 0.002;
            } else {
              // If there's only one point, default to above
              labelPosition[1] += 0.002;
              labelPosition[0] -= 0.002;
            }

            // Create the day and distance label
            const labelContent = document.createElement('div');
            labelContent.style.cssText = `
              background-color: ${color};
              color: white;
              padding: 4px 12px;
              border-radius: 20px;
              white-space: nowrap;
              font-size: 14px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              z-index: 100;
            `;
            labelContent.innerHTML = `Day${day} ${distance}`;

            new AMap.Marker({
              position: labelPosition,
              content: labelContent,
              anchor: 'bottom-center',
              offset: new AMap.Pixel(0, 10),
              zIndex: 110,
            }).setMap(map);

            // Create numbered markers for each location
            sortedPoints.forEach((point) => {
              const markerContent = document.createElement('div');
              markerContent.style.cssText = `
                background-color: ${color};
                color: white;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                border: 2px solid white;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                z-index: 100;
              `;
              markerContent.innerHTML = `${point.order}`;

              new AMap.Marker({
                position: point.position,
                content: markerContent,
                anchor: 'center',
                offset: new AMap.Pixel(0, 0),
                zIndex: 100,
              }).setMap(map);
            });

            // Calculate walking routes between consecutive points
            if (sortedPoints.length > 1) {
              const walkingOptions = {
                map: map,
                hideMarkers: true,
                autoFitView: false,
              };

              const processNextSegment = (index: number) => {
                if (index >= sortedPoints.length - 1) return;

                const startPoint = sortedPoints[index];
                const endPoint = sortedPoints[index + 1];
                const walking = new AMap.Walking(walkingOptions);
                console.log('startPoint', startPoint);
                console.log('endPoint', endPoint);

                walking.search(
                  startPoint.position,
                  endPoint.position,
                  (status: string, result: any) => {
                    console.log('result', result);
                    console.log('status', status);
                    if (status === 'complete' && result.routes && result.routes[0]) {
                      const pathArray = result.routes[0].steps.flatMap((step: any) => step.path);
                      console.log('pathArray', pathArray);
                      
                      new AMap.Polyline({
                        path: pathArray,
                        strokeColor: color,
                        strokeWeight: 6,
                        strokeOpacity: 0.8,
                        showDir: true,
                        lineJoin: 'round',
                        lineCap: 'round',
                        zIndex: 90,
                      }).setMap(map);

                      // Process next segment
                      processNextSegment(index + 1);
                    }
                  }
                );
              };

              // Start processing segments
              processNextSegment(0);
            }
          });

          // Add geolocation control
          map.addControl(new AMap.Geolocation());
        }).catch((error) => {
          console.error('AMap SDK load error:', error);
        });
      });
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div id="map-container" className="w-full h-screen"></div>
    </div>
  );
}