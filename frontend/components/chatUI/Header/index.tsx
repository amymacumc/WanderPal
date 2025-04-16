import React, { ReactNode } from 'react';
import { ChevronLeft } from 'lucide-react';

interface HeaderProps {
    avatar: ReactNode;
    name: string;
    onBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({ avatar, name, onBack }) => {
    return (
        <div className="flex items-center gap-3 px-4 py-3">
            <button 
                onClick={onBack} 
                className="p-1 hover:bg-black/5 rounded-full transition"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="w-8 h-8 rounded-full overflow-hidden">
                {avatar}
            </div>
            <span className="font-medium">{name}</span>
        </div>
    )   
}

export default Header;