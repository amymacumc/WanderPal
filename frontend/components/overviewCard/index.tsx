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
            className="bg-white rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow border-1"
            onClick={onClick}
        >
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <div className="flex flex-col">
                        <h3 className="text-xl font-bold text-blue-900">{title}</h3>
                        <span className="text-gray-500 text-sm">共{location.length}个地点</span>
                    </div>
                    <p className="text-gray-600 text-sm">{location.join(' → ')}</p>
                </div>
                <ChevronRight className="w-6 h-6 text-gray-400" />
            </div>
        </div>
    );
};

export default OverviewCard;
