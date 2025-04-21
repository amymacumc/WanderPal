export interface User {
  name: string;
  gender: string;
  age: string;
  location: string;
  mbti: string;
} 

export interface PlanOverview {
  title: string;
  daily_plans: DailyPlan[];
  cost: number;
}

export interface DailyPlan {
  id: string;
  activities: Activity[];
}

export interface Activity {
  id: string;
  name: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  description: string;
}
