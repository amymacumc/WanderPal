'use client';
import React, { useEffect } from 'react';

export default function MapPage() {
  useEffect(() => {
    if(typeof window !== 'undefined') {
        import('@amap/amap-jsapi-loader').then((AMapLoader) => {
            AMapLoader.load({
                key: process.env.NEXT_PUBLIC_AMAP_KEY || '',
                version: '2.0',
                plugins: ['AMap.Geolocation', 'AMap.Marker'],
              }).then((AMap) => { 
                const map = new AMap.Map('map-container', {
                  viewMode: '2D',
                  zoom: 11,
                  center: [116.397428, 39.90923], // Beijing coordinates
                });
          
                // Add marker
                new AMap.Marker({
                  position: [116.397428, 39.90923],
                  map: map,
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
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">AMap Demo</h1>
      <div id="map-container" className="w-full h-96 border rounded-lg"></div>
      <p className="mt-4 text-sm text-gray-600">
        This is a demo of AMap SDK integration with Next.js
      </p>
    </div>
  );
}