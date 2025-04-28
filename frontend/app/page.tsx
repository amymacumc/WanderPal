"use client"

import React, { useState } from "react";
import ProfileCard from "@/components/profileCard";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import Rotate from "@/components/Rotate";

const companions = [
    {
        name: "拍照达人",
        avatar: "/images/bulter.png",
        description: "AI 助手",
        text: "我会带你去每个景点，记录你的旅行瞬间，分享给你"
    },
    {
        name: "贴心管家",
        avatar: "/images/bulter.png",
        description: "AI 助手",
        text: "我会根据你的目的地和详细需求，生成全面和细致的专业行程规划"
    },
    {
        name: "撸猫爱好者",
        avatar: "/images/bulter.png",
        description: "AI 助手",
        text: "我会带你去撸猫猫，记录你的旅行瞬间，分享给你"
    }
]

export default function Home() {
    const router = useRouter();
    const [activeCompanionIndex, setActiveCompanionIndex] = useState(1); // Default to second companion
    const activeCompanion = companions[activeCompanionIndex];

    const handleStartChat = () => {
        // You can now use activeCompanion when starting the chat
        // For example, pass the active companion to the conversation page
        router.push(`/conversation?companion=${activeCompanion.name}`);
    };

    return (
        <div className="min-h-screen p-4 bg-gradient-to-b from-[#E4F2FF] to-[#EEF3FF]">
            {/* Close button */}
            <div className="flex justify-end mb-4">
                <button className="p-2 rounded-full bg-white">
                    <X className="w-6 h-6" />
                </button>
            </div>
            <div className="overflow-hidden">
                <Rotate 
                    width={343} 
                    height={500} 
                    spacing={200}
                    initialActiveIndex={1}
                    onActiveIndexChange={setActiveCompanionIndex}
                >
                    {companions.map((companion, index) => (
                        <div key={index} className="w-full h-full">
                            <ProfileCard
                                name={companion.name}
                                avatar={companion.avatar}
                                description={companion.description}
                            />
                        </div>
                    ))}
                </Rotate>
            </div>
    
            {/* Content below card - now dynamically shows active companion info */}
            <div className="mt-8 text-center px-4">
                <h2 className="text-2xl font-bold mb-4">{activeCompanion.name}</h2>
                <p className="text-gray-600 mb-8">
                    {activeCompanion.text}
                </p>

                {/* Action Button */}
                <button 
                    onClick={handleStartChat}
                    className="w-full max-w-md bg-black text-white py-4 rounded-full text-lg font-medium hover:bg-black/90 transition-colors"
                >
                    开始聊天
                </button>
            </div>
        </div>
    );
}
