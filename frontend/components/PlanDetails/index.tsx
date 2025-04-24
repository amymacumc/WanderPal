import React, { useState } from 'react';
import LocationCard from '../LocationCard';
import { Activity, DailyPlan } from '@/types/user';
import MobilePopup from '@/components/popup';
import ActivityDetail from '@/components/ActivityDetail';

interface PlanDetailsProps {
    plan: DailyPlan;
}

const PlanDetails = ({ plan }: PlanDetailsProps) => {
    const [showPopup, setShowPopup] = useState(false);
    const [activeActivity, setActiveActivity] = useState<Activity>({} as Activity); // TODO: get activity inf

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {plan.activities.map((activity, index) => (
                <LocationCard 
                    key={activity.id} 
                    type={'景点'} order={index + 1}  
                    name={activity.name} 
                    imageUrl={activity.imageUrl || 'https://cataas.com/cat'}
                    transportInfo={{
                        distance: '11km',
                        duration: '1小时'
                    }}
                    onClick={() => {
                        setShowPopup(true);
                        setActiveActivity(activity);
                    }}
                 />
            ))}
            {showPopup && 
            <MobilePopup visible={showPopup} onClose={() => setShowPopup(false) }>
                <ActivityDetail className='h-full' title={activeActivity.name} description={activeActivity.description} img={activeActivity.imageUrl || 'https://cataas.com/cat'}  />
            </MobilePopup>
            }
        </div>
    )
}

export default PlanDetails;