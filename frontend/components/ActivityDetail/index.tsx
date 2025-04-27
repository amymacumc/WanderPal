import React from "react";
import { cn } from "@/lib/utils";
import { Clock7, TicketMinus, MapPin, Phone, Info } from "lucide-react";

export interface ActivityDetailProps {
  title: string;
  description: string;
  img: string;
  className?: string;
  infos?: string[];
}

const iconList = [
  <Clock7 />,
  <TicketMinus />,
  <MapPin />,
  <Phone />,
  <Info />
]

const ActivityDetail: React.FC<ActivityDetailProps> = ({ title, description, img, className, infos}) => {
  return (
    <div className={cn('space-y-6 px-4 py-2 z-60 overflow-scroll', className)}>
        <div className="color-title text-2xl font-bold">{title}</div>
        <div className="h-60 w-full overflow-hidden">
          <img src={img} alt="" width={350} height={200} />
        </div>
        { description && <div>
            <div className="color-title font-bold">简介</div>
            <div className="color-description">{description}</div>
        </div>}
        {
          infos && 
          <div className="space-y-3"> {
          infos.map((info, index) => 
             <div key={index} className="flex items-center gap-2 color-title">
              <div className="w-4 h-4 rounded-full flex items-center justify-center">
                {iconList[index]}
              </div>
              <div>{info}</div>
              </div>
          )    }
          </div>
        }
    </div>
  );
}

export default ActivityDetail;