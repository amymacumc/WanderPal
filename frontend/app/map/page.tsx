'use client';
import React from 'react';
import Map, { RoutePoint } from '@/components/Map';

declare global {
  interface Window {
    _AMapSecurityConfig?: {
      securityJsCode: string;
    };
  }
}

export default function MapPage() {
  // Sample route data - you would replace this with your actual data
  const routes: RoutePoint[] = [
    { position: [116.397428, 39.90923], day: 1, order: 1, name: "Location 1" },
    { position: [116.407428, 39.91923], day: 1, order: 2, name: "Location 2" },
    { position: [116.417428, 39.90923], day: 2, order: 2, name: "Location 3" },
    { position: [116.427428, 39.91923], day: 2, order: 1, name: "Location 4" },
  ];

  // Custom colors for different days (optional)
  const dayColors = {
    1: '#4285f4', // Blue for Day 1
    2: '#00ffff', // Cyan for Day 2
    3: '#ff69b4', // Pink for Day 3
    4: '#00ff00', // Green for Day 4
    5: '#9370db', // Purple for Day 5
  };

  // Sample distances for each day (optional)
  const dayDistances = {
    1: '19km',
    2: '10km',
    3: '10km',
    4: '10km',
    5: '10km',
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full h-screen">
        <Map 
          routes={routes} 
          dayColors={dayColors} 
          dayDistances={dayDistances} 
        />
      </div>
    </div>
  );
}