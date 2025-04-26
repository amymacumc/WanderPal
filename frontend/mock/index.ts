import type { DailyPlan, planOverview } from "@/types/user"

const plan: DailyPlan[] = [
    {
        id: "day1",
        activities: [
            {
                id: "activity1",
                name: "故宫博物院",
                coordinates: {
                    latitude: 39.90923,
                    longitude: 116.397428
                },
                description: "中国明清两代的皇家宫殿，世界上现存规模最大、保存最为完整的木质结构古建筑之一。"
            },
            {
                id: "activity2",
                name: "颐和园",
                coordinates: {
                    latitude: 39.91923,
                    longitude: 116.407428
                },
                description: "中国清朝时期的皇家园林，被誉为\"皇家园林博物馆\"。"
            }
        ],
        routes: [
            {
                way: "地铁",
                distance: "11km",
                time: "1小时",
                activity_ids: {
                    from: "activity1",
                    to: "activity2"
                }
            }
        ]
    },
    {
        id: "day2",
        activities: [
            {
                id: "activity3",
                name: "长城",
                coordinates: {
                    latitude: 39.90923,
                    longitude: 116.417428
                },
                description: "世界上最伟大的建筑工程之一，也是中国古代军事防御工程。"
            },
            {
                id: "activity4",
                name: "天坛",
                coordinates: {
                    latitude: 39.91923,
                    longitude: 116.427428
                },
                description: "中国古代皇帝祭天的场所，是中国现存最大的古代祭祀建筑群。"
            }
        ],
        routes: [
            {
                way: "地铁",
                distance: "11km",
                time: "1小时",
                activity_ids: {
                    from: "activity3",
                    to: "activity4"
                }
            }
        ]
    }
]

export const planOverviewData: planOverview = {
    title: "北京两日历史之旅",
    daily_plans: plan,
    cost: 1000
}

