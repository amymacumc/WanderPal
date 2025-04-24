import React from 'react';
import { Smartphone, Train, Banknote, AppWindow, Backpack } from 'lucide-react';

interface ReminderItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ReminderItem: React.FC<ReminderItemProps> = ({ icon, title, description }) => {
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
}

const Reminder: React.FC<ReminderProps> = ({ className }) => {
  const reminderItems = [
    {
      icon: <Banknote size={20} />,
      title: '签证',
      description: '提前4-6周申请旅游签证，查看是否需打印入境证明'
    },
    {
      icon: <Smartphone size={20} />,
      title: '通信',
      description: '建议准备日本电话卡或开通国际漫游（docomo / SoftBank）'
    },
    {
      icon: <Train size={20} />,
      title: '交通',
      description: '建议提前兑换Suica / PASMO交通卡并预充值'
    },
    {
      icon: <Banknote size={20} />,
      title: '现金',
      description: '建议携带日元现金¥30,000以上，部分小店不可刷卡'
    },
    {
      icon: <AppWindow size={20} />,
      title: '推荐App',
      description: 'Google Maps、Google Translate、Klook、Japan Travel（乘车指南）'
    },
    {
      icon: <Backpack size={20} />,
      title: '行李提醒',
      description: '护照/充电宝/插头转换器（A/B型）/折叠伞/外套（春季昼夜温差大）/常用药物/墨镜（紫外线强），建议防晒霜、帽子'
    }
  ];

  return (
    <div className={`w-full bg-white rounded-xl p-4 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <div className="text-lg font-semibold text-[#011534]">行前提醒</div>
      </div>
      <div className="divide-y divide-gray-100">
        {reminderItems.map((item, index) => (
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