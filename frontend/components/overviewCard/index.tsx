import React from 'react';
import { ChevronRight } from 'lucide-react';

interface OverviewCardProps {
    location: string[];
    onClick: () => void;
    title: string;
}

const OverviewCard: React.FC<OverviewCardProps> = ({ location, onClick, title }) => {
    return (
        <div 
            className="bg-white rounded-2xl p-4 cursor-pointer hover:shadow-md transition-shadow border-1"
            onClick={onClick}
        >
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">{title}</h3>
                        <span className="text-gray-500 text-sm">共{location.length}个地点</span>
                    </div>
                    <p className="text-gray-600">{location.join('—')}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
        </div>
    );
};

export default OverviewCard;
