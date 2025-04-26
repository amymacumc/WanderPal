import React, { ReactNode } from "react"

interface WelcomeProps {
    icon: ReactNode;
    title: string;
    description: string;
}

const Welcome: React.FC<WelcomeProps> = ({ icon, title, description }) => {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm max-w-[600px] mx-auto my-4">
            <div className="flex items-start gap-3">
                <div className="text-2xl">
                    {icon}
                </div>
                <div>
                    <h1 className="text-xl font-medium mb-1">{title}</h1>
                    <p className="text-gray-600">{description}</p>
                </div>
            </div>
        </div>
    )
}

export default Welcome;

