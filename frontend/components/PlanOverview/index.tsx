"use client";
import React from 'react';
import type { planOverview, DailyPlan } from '@/types/user';
import OverviewCard from '@/components/overviewCard';
import { useRouter } from "next/navigation";
import { travelOverview } from '../chatUI/type';
interface PlanOverviewProps extends travelOverview {}

const dayFormater = (num: number) => `DAY ${num}`;

const PlanOverview: React.FC<PlanOverviewProps> = ({ title, daily_plan, estimated_budget, id, image }) => {
  const router = useRouter();

  return (
    <div className='w-full max-w-screen-md mx-auto grid gap-3 px-3 py-2'>
      <div className='text-2xl font-bold color-title'>{title}</div>
      <div className='flex gap-2 color-sub-text'>
        <div>{`${daily_plan.length}天${daily_plan.length - 1}晚`}</div>
        <div>{`共${daily_plan.reduce((sum, plan) => sum + plan.length, 0)}个地点`}</div>
      </div>
      {estimated_budget && <div className='color-primary border border-color-primary w-fit rounded-full px-2 py-1 text-sm'>{`预估${estimated_budget}元`}</div>}
      <div w-full>
        <img
          src={image}
          alt="plan"
          className="w-full h-full object-cover"
        />
      </div>
      {daily_plan.map((plan, index) => <OverviewCard key={index} title={dayFormater(index + 1)} location={plan.map((activity) => activity)} onClick={() => {}} />)}
      <button 
        onClick={() => {
          router.push(`/travel?id=${id}`);
        }}
        className="h-12 bg-[#011534] text-white rounded-full flex items-center justify-center cursor-pointer ">
        查看详情
      </button>
    </div>
  );
};  

export default PlanOverview;
