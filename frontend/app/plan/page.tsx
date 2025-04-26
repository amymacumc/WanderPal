'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, PanInfo, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { getTravelList } from '@/utils/api';

export interface TravelPlan {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  duration: string;
  locations: number;
  image: string;
  daysUntilStart?: string;
}

const PlanPage = () => {
  const [plans, setPlans] = useState<TravelPlan[]>([]);
  const router = useRouter();

  useEffect(() => {
    getTravelList().then((res) => {
      console.log(res);
      setPlans(res);
    });
  }, [])

  const handleDelete = (id: string) => {
    setPlans(plans.filter(plan => plan.id !== id));
  };

  return (
    <div className="min-h-screen bg-blue-50 p-4">
      <h1 className="text-2xl font-bold mb-6 px-2">我的行程</h1>
      <div className="space-y-4">
        {plans.map((plan) => (
          <SwipeableCard key={plan.id} plan={plan} onDelete={handleDelete} onClick={() => {
            router.push(`/travel?id=${plan.id}&from=plan`);
          }} />
        ))}
      </div>
      <button 
        className="z-3 absolute bottom-4 left-1/2 -translate-x-1/2 h-12 bg-[#011534] text-white rounded-full flex items-center justify-center cursor-pointer px-4 py-2 self-center"
        onClick={() => router.push('/')}
      >
      创建新的行程
      </button>
    </div>
  );
};

const SwipeableCard = ({ plan, onDelete, onClick }: { plan: TravelPlan; onDelete: (id: string) => void; onClick: () => void}) => {
  const controls = useAnimation();
  const [isOpen, setIsOpen] = useState(false);
  const x = useMotionValue(0);
  
  // Transform x motion value to delete button opacity and position
  const deleteButtonX = useTransform(x, [-20, 0], [0, 40]);
  const deleteButtonOpacity = useTransform(x, [-20, 0], [1, 0]);

  const handleDragEnd = async (event: any, info: PanInfo) => {
    if (info.offset.x < -20) {
      await controls.start({ x: -80 });
      setIsOpen(true);
    } else {
      controls.start({ x: 0 });
      setIsOpen(false);
    }
  };

  const handleDeleteClick = async () => {
    await controls.start({ x: -200, opacity: 0 });
    setTimeout(() => onDelete(plan.id), 200);
  };

  const handleCardClick = () => {
    if (isOpen) {
      controls.start({ x: 0 });
      setIsOpen(false);
    }
  };

  return (
    <motion.div 
      className="relative"
      initial={false}
      animate={controls}
    >
      {/* Card Content */}
      <motion.div
        drag="x"
        dragConstraints={{ left: -20, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        onClick={handleCardClick}
        style={{ x }}
        className="relative z-10 bg-white rounded-3xl shadow-sm cursor-pointer"
      >
        <div className="flex p-4 items-start space-x-4" onClick={onClick}>
          <div className="flex-1">
            {plan.daysUntilStart && (
              <div className="text-blue-600 text-sm mb-2">{plan.daysUntilStart}</div>
            )}
            <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
            <div className="text-gray-500 space-y-1">
              <p>{plan.startDate}-{plan.endDate} {plan.duration}</p>
              <p>共{plan.locations}个地点</p>
            </div>
          </div>
          <div className="relative w-24 h-24 rounded-2xl overflow-hidden">
            <img src={plan.image} alt={plan.title} className="absolute inset-0 object-cover" />
          </div>
        </div>
      </motion.div>
      
      {/* Delete button */}
      <motion.div 
        className="absolute -right-16 top-0 h-full"
        style={{ 
          x: isOpen ? 0 : deleteButtonX,
          opacity: isOpen ? 1 : deleteButtonOpacity
        }}
        transition={{ type: "spring", stiffness: 400, damping: 40, duration: 0.1 }}
      >
        <div className="h-full flex items-center bg-red-500 px-6 rounded-r-3xl">
          <button 
            onClick={handleDeleteClick}
            className="text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PlanPage;
