import React from 'react';
import { Smartphone, Train, Banknote, AppWindow, Backpack } from 'lucide-react';

interface ReminderItemProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
}

const ReminderItem: React.FC<ReminderItemProps> = ({ icon = <Banknote size={16} />, title, description }) => {
  return (
    <div className="flex items-start gap-3 py-3">
      <div className="text-primary p-1">
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-base font-medium">{title}</div>
        <div className="text-sm text-gray-600">{description}</div>
      </div>
    </div>
  );
};

interface ReminderProps {
  className?: string;
  items?: ReminderItemProps[];
}

const Reminder: React.FC<ReminderProps> = ({ className, items = [] }) => {

  return (
    <div className={`w-full bg-white rounded-xl p-4 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <div className="text-lg font-semibold text-[#011534]">行前提醒</div>
      </div>
      <div className="divide-y divide-gray-100">
        {items.map((item, index) => (
          <ReminderItem
            key={index}
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Reminder;