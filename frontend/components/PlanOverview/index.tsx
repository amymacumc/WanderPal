import React from 'react';
import type { PlanOverview, DailyPlan } from '@/types/user';
import OverviewCard from '@/components/overviewCard';
import Tabs from '@/components/tabs';
import Map, { RoutePoint } from '@/components/Map';
interface PlanOverviewProps extends PlanOverview {}

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
  return (
    <div className='w-full max-w-screen-md mx-auto grid gap-3 px-3 py-2'>
      <div className='text-2xl font-bold color-title'>{title}</div>
      <div className='flex gap-2'>
        <div>{`${daily_plans.length}天${daily_plans.length - 1}晚`}</div>
        <div>{`共${daily_plans.reduce((sum, plan) => sum + plan.activities.length, 0)}个地点`}</div>
      </div>
      {cost && <div>{`总花费${cost}元`}</div>}
      <div className="h-40">
        <Map routes={getRoutes(daily_plans)} />
      </div>
      <Tabs tabs={['概览', ...daily_plans.map((plan, index) => dayFormater(index + 1))]} activeTab={dayFormater(1)} onChange={() => {}} />
      {daily_plans.map((plan, index) => <OverviewCard key={plan.id} title={dayFormater(index + 1)} location={plan.activities.map((activity) => activity.name)} onClick={() => {}} />)}
    </div>
  );
};  

export default PlanOverview;
