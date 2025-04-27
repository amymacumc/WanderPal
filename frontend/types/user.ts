export interface User {
  name: string;
  gender: string;
  age: string;
  location: string;
  mbti: string;
} 

export interface planOverview {
  title: string;
  daily_plans: DailyPlan[];
  cost: number;
  id: string;
  reminder: string[];
}

export interface DailyPlan {
  id: string;
  activities: Activity[];
  routes: Route[];
}

export interface Route {
  way: string;
  distance: string;
  time: string;
  from_name: string;
  to_name: string;
}

export interface Activity {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  description: string;
  image?: string;
  infos?: string[];
}
