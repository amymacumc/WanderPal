"use client"

import React, { useState } from 'react';
import LocationCard from '../LocationCard';
import { Activity, DailyPlan } from '@/types/user';
import MobilePopup from '@/components/popup';
import ActivityDetail from '@/components/ActivityDetail';


interface PlanDetailsProps {
    plan: DailyPlan;
}

const PlanDetails = ({ plan }: PlanDetailsProps) => {
    const { routes = [] } = plan;
    const [showPopup, setShowPopup] = useState(false);
    const [activeActivity, setActiveActivity] = useState<Activity>({} as Activity); // TODO: get activity inf
    console.log('activeActivity', activeActivity);

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {plan.activities.map((activity, index, arr) => (
                <LocationCard 
                    key={activity.id} 
                    type={'景点'} 
                    order={index + 1}  
                    name={activity.name} 
                    imageUrl={activity.image || 'https://cataas.com/cat'}
                    transportInfo={index === arr.length - 1 ? undefined : {
                        distance: routes[index]?.distance,
                        duration: routes[index]?.time,
                        way: routes[index]?.way
                    }}
                    onClick={() => {
                        setShowPopup(true);
                        setActiveActivity(activity);
                    }}
                 />
            ))}
            {showPopup && 
            <MobilePopup visible={showPopup} onClose={() => setShowPopup(false) }>
                <ActivityDetail 
                    className='h-full' 
                    title={activeActivity.name} 
                    description={activeActivity.description} 
                    img={activeActivity.image || 'https://cataas.com/cat'}  
                    infos={activeActivity.infos}
                />
            </MobilePopup>
            }
        </div>
    )
}

export default PlanDetails;