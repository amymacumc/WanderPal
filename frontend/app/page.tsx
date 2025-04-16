"use client"

import React from "react";
import ProfileCard from "@/components/profileCard";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    const handleStartChat = () => {
        router.push('/chat');
    };

    return (
        <div className="min-h-screen p-4 bg-gradient-to-b from-[#E4F2FF] to-[#EEF3FF]">
            {/* Close button */}
            <div className="flex justify-end mb-4">
                <button className="p-2 rounded-full bg-white">
                    <X className="w-6 h-6" />
                </button>
            </div>

            {/* Profile Card */}
            <ProfileCard
                name="专业规划"
                description="专业规划"
                avatar="https://cataas.com/cat"
            />

            {/* Content below card */}
            <div className="mt-8 text-center px-4">
                <h2 className="text-2xl font-bold mb-4">贴心管家型</h2>
                <p className="text-gray-600 mb-8">
                    我会根据你的目的地偏好和详细需求，生成<br />
                    全面和细致的专业行程规划
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
