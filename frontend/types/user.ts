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
  activity_ids: {
    from: string;
    to: string;
  }
}

export interface Activity {
  id: string;
  name: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  description: string;
  imageUrl?: string;
}
