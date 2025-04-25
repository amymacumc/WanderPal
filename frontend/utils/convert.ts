import { travelOverview } from "@/components/chatUI/type";
import { RoutePoint } from "@/components/Map";
import { DailyPlan } from "@/types/user";

export const dayFormater = (num: number) => `DAY ${num}`;

export const getRoutes = (daily_plans: DailyPlan[]) => {
  return daily_plans.map((plan, index) => plan.activities.map((activity, idx) => ({
    position: [activity.longitude, activity.latitude],
    day: index + 1,
    order: idx + 1,
    name: activity.name,
  } as RoutePoint))).flat(1);
}

export const getLocationSum = (travel: travelOverview) => {
  return travel.daily_plan.reduce((sum, plan) => sum + plan.length, 0);
}