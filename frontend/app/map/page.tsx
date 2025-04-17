'use client';
import React, { useEffect, useState } from 'react';

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
    { position: [116.417428, 39.90923], day: 2, order: 1, name: "Location 3" },
    { position: [116.427428, 39.91923], day: 2, order: 2, name: "Location 4" },
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
        AMapLoader.load({
          key: process.env.NEXT_PUBLIC_AMAP_KEY || '',
          version: '2.0',
          plugins: ['AMap.Geolocation', 'AMap.Text', 'AMap.Polyline'],
        }).then((AMap) => {
          const map = new AMap.Map('map-container', {
            viewMode: '2D',
            zoom: 13,
            center: routes[0].position,
          });

          // Group routes by day
          const routesByDay = routes.reduce((acc, point) => {
            if (!acc[point.day]) acc[point.day] = [];
            acc[point.day].push(point);
            return acc;
          }, {} as Record<number, RoutePoint[]>);

          // Create markers and lines for each day
          Object.entries(routesByDay).forEach(([day, dayPoints]) => {
            const color = dayColors[Number(day) as keyof typeof dayColors];
            const distance = dayDistances[Number(day) as keyof typeof dayDistances];
            
            // Sort points by order
            const sortedPoints = dayPoints.sort((a, b) => a.order - b.order);

            // Calculate the midpoint for the day label
            const labelPosition = [...sortedPoints[0].position];
            // Offset the label slightly to the left and up
            labelPosition[0] -= 0.002; // Adjust these values as needed
            labelPosition[1] += 0.001; // Adjust these values as needed

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
            `;
            labelContent.innerHTML = `Day${day} ${distance}`;

            // Add the day label marker
            new AMap.Marker({
              position: labelPosition,
              content: labelContent,
              anchor: 'bottom-center',
              offset: new AMap.Pixel(0, -10),
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
              `;
              markerContent.innerHTML = `${point.order}`;

              // Add location marker
              new AMap.Marker({
                position: point.position,
                content: markerContent,
                anchor: 'center',
                offset: new AMap.Pixel(0, 0),
              }).setMap(map);
            });

            // Create lines connecting points for this day
            if (sortedPoints.length > 1) {
              const path = sortedPoints.map(point => point.position);
              new AMap.Polyline({
                path: path,
                strokeColor: color,
                strokeWeight: 4,
                strokeOpacity: 0.8,
                showDir: true,
              }).setMap(map);
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