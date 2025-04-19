'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, PanInfo, useAnimation, useMotionValue, useTransform } from 'framer-motion';

interface TravelPlan {
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
  const [plans, setPlans] = useState<TravelPlan[]>([
    {
      id: '1',
      title: '日本东京休闲之旅',
      startDate: '5/8',
      endDate: '5/13',
      duration: '5天4晚',
      locations: 22,
      image: 'https://cataas.com/cat',
      daysUntilStart: '8天后出发'
    },
    {
      id: '2',
      title: '西双版纳5日游',
      startDate: '未定',
      endDate: '未定',
      duration: '5天4晚',
      locations: 12,
      image: 'https://cataas.com/cat'
    },
    {
      id: '3',
      title: '重庆3日游',
      startDate: '8/6',
      endDate: '8/8',
      duration: '3天2晚',
      locations: 8,
      image: 'https://cataas.com/cat'
    }
  ]);

  const handleDelete = (id: string) => {
    setPlans(plans.filter(plan => plan.id !== id));
  };

  return (
    <div className="min-h-screen bg-blue-50 p-4">
      <h1 className="text-2xl font-bold mb-6 px-2">我的行程</h1>
      <div className="space-y-4">
        {plans.map((plan) => (
          <SwipeableCard key={plan.id} plan={plan} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

const SwipeableCard = ({ plan, onDelete }: { plan: TravelPlan; onDelete: (id: string) => void }) => {
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
        <div className="flex p-4 items-start space-x-4">
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
            <Image
              src={plan.image}
              alt={plan.title}
              fill
              className="object-cover"
            />
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
