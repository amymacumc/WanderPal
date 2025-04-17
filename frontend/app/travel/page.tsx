'use client'
import React, { useState } from 'react';
import OverviewCard from '@/components/overviewCard';
import Tabs from '@/components/tabs';

const getOverview = (length: number) => {
    const overview = [];
    for (let i = 0; i < length; i++) {
        overview.push({
            location: ['成都国际机场', '银座', '秋叶原'],
            title: `Day${i + 1}`,
        });
    }
    return overview;
}

export default function TravelPage() {
    const overview = getOverview(5);
    const [activeTab, setActiveTab] = useState('概览');
    return (
        <div className="flex flex-col gap-4 p-4">
            <h1>Travel Page</h1>
            <Tabs 
                tabs={['概览', 'Day1', 'Day2', 'Day3', 'Day4', 'Day5']}
                activeTab={activeTab}
                onChange={(tab) => {setActiveTab(tab)}}
            />
            {overview.map((item) => (
            <OverviewCard 
                key={item.title}
                location={['成都国际机场', '银座', '秋叶原']}
                onClick={() => {}}
                title="Day1"
            />))}
        </div>
    );
}