import { RoutePoint } from "@/components/Map";
import { DailyPlan } from "@/types/user";

export const dayFormater = (num: number) => `DAY ${num}`;

export const getRoutes = (daily_plans: DailyPlan[]) => {
  return daily_plans.map((plan, index) => plan.activities.map((activity, idx) => ({
    position: [activity.coordinates.longitude, activity.coordinates.latitude],
    day: index + 1,
    order: idx + 1,
    name: activity.name,
  } as RoutePoint))).flat(1);
}