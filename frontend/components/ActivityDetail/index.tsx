import React from "react";
import Image from 'next/image';
import { cn } from "@/lib/utils";

export interface ActivityDetailProps {
  title: string;
  description: string;
  img: string;
  className?: string;
}

const ActivityDetail: React.FC<ActivityDetailProps> = ({ title, description, img, className}) => {
  return (
    <div className={cn('space-y-6 px-4 py-2', className)}>
        <div className="color-title text-2xl font-bold">{title}</div>
        <Image src={img} alt="" width={350} height={200} />
        { description && <div>
            <div className="color-title font-bold">简介</div>
            <div className="color-description">{description}</div>
        </div>}
    </div>
  );
}

export default ActivityDetail;