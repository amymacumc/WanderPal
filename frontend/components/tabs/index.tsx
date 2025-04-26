import React from 'react';
import { cn } from '@/lib/utils';

interface TabsProps {
    tabs: string[];
    activeTab: string;
    onChange: (tab: string, index: number) => void;
    className?: string;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onChange, className }) => {
    return (
        <div className={cn("flex gap-2 overflow-x-auto no-scrollbar", className)}>
            {tabs.map((tab, index) => (
                <button
                    key={tab}
                    onClick={() => onChange(tab, index)}
                    className={cn(
                        "px-4 py-2 rounded-full whitespace-nowrap transition-colors",
                        "text-sm font-medium",
                        activeTab === tab
                            ? "border-2 border-title"
                            : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                    )}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
};

export default Tabs;

// Usage example:
/*
const tabs = ["概览", "Day1", "Day2", "Day3", "Day4", "Day5"];
const [activeTab, setActiveTab] = useState("概览");

<Tabs 
    tabs={tabs}
    activeTab={activeTab}
    onChange={setActiveTab}
/>
*/
