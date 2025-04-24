"use client";
import React from 'react';
import type { planOverview, DailyPlan } from '@/types/user';
import OverviewCard from '@/components/overviewCard';
import Tabs from '@/components/tabs';
import Map, { RoutePoint } from '@/components/Map';
import { useRouter } from "next/navigation";
interface PlanOverviewProps extends planOverview {}

const dayFormater = (num: number) => `DAY ${num}`;

const getRoutes = (daily_plans: DailyPlan[]) => {
  return daily_plans.map((plan, index) => plan.activities.map((activity, idx) => ({
    position: [activity.coordinates.longitude, activity.coordinates.latitude],
    day: index + 1,
    order: idx + 1,
    name: activity.name,
  } as RoutePoint))).flat(1);
}

const PlanOverview: React.FC<PlanOverviewProps> = ({ title, daily_plans, cost }) => {
  const router = useRouter();

  return (
    <div className='w-full max-w-screen-md mx-auto grid gap-3 px-3 py-2'>
      <div className='text-2xl font-bold color-title'>{title}</div>
      <div className='flex gap-2 color-sub-text'>
        <div>{`${daily_plans.length}天${daily_plans.length - 1}晚`}</div>
        <div>{`共${daily_plans.reduce((sum, plan) => sum + plan.activities.length, 0)}个地点`}</div>
      </div>
      {cost && <div className='color-primary border border-color-primary w-fit rounded-full px-2 py-1 text-sm'>{`预估${cost}元`}</div>}
      <Tabs tabs={['概览', ...daily_plans.map((plan, index) => dayFormater(index + 1))]} activeTab={'概览'} onChange={() => {}} />
      <div className="h-40">
        <Map routes={getRoutes(daily_plans)} />
      </div>
      {daily_plans.map((plan, index) => <OverviewCard key={plan.id} title={dayFormater(index + 1)} location={plan.activities.map((activity) => activity.name)} onClick={() => {}} />)}
      <button 
        onClick={() => {
          router.push(`/travel`);
        }}
        className="h-12 bg-[#011534] text-white rounded-full flex items-center justify-center cursor-pointer ">
        查看详情
      </button>
    </div>
  );
};  

export default PlanOverview;
