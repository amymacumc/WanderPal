import React from 'react';
import { Sparkles } from 'lucide-react';

interface ProfileCardProps {
    name: string;
    avatar: string;
    description: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ name, avatar, description }) => {
    return (
        <div className="relative w-full max-w-md mx-auto p-6 rounded-[2rem] overflow-hidden bg-gray-200">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/40 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
                <Sparkles className="w-6 h-6 p-1 rounded-full bg-white" />
                <span className="text-sm font-medium">{description}</span>
            </div>

            {/* Profile Image Container */}
            <div className="relative aspect-square w-full overflow-hidden rounded-[1.5rem]">
                <img 
                    src={avatar} 
                    alt={name}
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    )
}   

export default ProfileCard;