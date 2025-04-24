'use client'
import React, { useState } from 'react';
import { DailyPlan } from '@/types/user';
import { planOverviewData } from '@/mock/index';
import Tabs from '@/components/tabs';
import Map from '@/components/Map';
import OverviewCard from '@/components/overviewCard';
import { dayFormater, getRoutes } from '@/utils/convert';
import PlanDetails from '@/components/PlanDetails';
import Reminder from './components/Reminder';

function getRoutesByTab(daily_plans: DailyPlan[], activeTab: number) {
    const routes = getRoutes(daily_plans);
    if(activeTab === 0) {
        return routes;
    } else {
        return routes.filter(route => route.day === activeTab);
    }
}

export default function TravelPage() {
    const {title,  daily_plans, cost} = planOverviewData;
    const tabs = ['概览', ...daily_plans.map((plan, index) => dayFormater(index + 1))];
    const [activeTab, setActiveTab] = useState(0);

    function renderTabContent(daily_plans: DailyPlan[], activeTab: number) {
        if(activeTab === 0) {
            return (<>
            {daily_plans.map((plan, index) => <OverviewCard key={plan.id} title={dayFormater(index + 1)} location={plan.activities.map((activity) => activity.name)} onClick={() => {setActiveTab(index + 1)}} />)}
            <Reminder />
            </>) 
        } else {
            return <PlanDetails plan={daily_plans[activeTab - 1]} />;
        }
    }

    return (
        <>
        <div className='w-full h-full relative'>
        <div className="h-60 absolute top-0 left-0 right-0" >
            <Map routes={getRoutesByTab(daily_plans, activeTab)} />
        </div>
        <div className='relative z-2 top-60 w-full bg-white max-w-screen-md mx-auto grid gap-3 px-3 py-2 rounded-tl-lg rounded-tr-2xl'>
            <div className='flex items-center gap-4'>
            <div className='text-2xl font-bold color-title'>{title}</div>
            {cost && <div className='color-primary border border-color-primary w-fit rounded-full px-2 py-1 text-sm'>{`预估${cost}元`}</div>}
            </div>
            <div className='flex gap-2 color-sub-text'>
            <div>{`${daily_plans.length}天${daily_plans.length - 1}晚`}</div>
            <div>{`共${daily_plans.reduce((sum, plan) => sum + plan.activities.length, 0)}个地点`}</div>
            </div>
            <Tabs tabs={tabs} activeTab={tabs[activeTab]} onChange={(tab,index) => {setActiveTab(index)}} />
            {renderTabContent(daily_plans, activeTab)}
            <div className='z-3 absolute bottom-4 left-1/2 -translate-x-1/2 h-12 bg-[#011534] text-white rounded-full flex items-center justify-center cursor-pointer px-4 py-2 self-center'>保存为我的行程</div>
        </div>
        </div>

        </>
    );
}