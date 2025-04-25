import React from 'react';
import Image from 'next/image';
import { CarFront, Footprints } from 'lucide-react';

interface LocationCardProps {
  type?: string;
  name: string;
  order?: number;
  imageUrl: string;
  recommendations?: {
    icon: string;
    text: string;
    details: string;
  }[];
  transportInfo?: {
    distance: string;
    duration: string;
    way: string;
  };
  onClick?: () => void;
}

function getIconByWay(way: string) {
  switch (way) {
    case '步行':
      return <Footprints />;
    case '打车':
      return <CarFront />;
    default:
      return <CarFront />;
  }
}

const LocationCard: React.FC<LocationCardProps> = ({
  type,
  name,
  order,
  imageUrl,
  recommendations,
  transportInfo,
  onClick
}) => {
  return (
    <div className="w-full bg-white rounded-xl p-4 space-y-4" onClick={onClick}>
      <div className="flex gap-4">
        <div className="w-20 h-20 relative rounded-lg overflow-hidden flex-shrink-0">
          <img src={imageUrl} alt={name} className="absolute inset-0 object-cover" />
        </div>
        <div className="flex-1">
          <div className="text-gray-500 text-sm mb-1">{type}</div>
          <div className="flex items-start gap-2">
            {order && <div className="text-lg font-medium">{order}.</div>}
            <h3 className="text-lg font-medium text-[#011534]">{name}</h3>
          </div>
        </div>
      </div>

      {recommendations && recommendations.map((rec, index) => (
        <div key={index} className="bg-gray-50 p-3 rounded-lg space-y-2">
          <div className="flex items-center gap-2">
            <Image src={rec.icon} alt="" width={16} height={16} />
            <span className="text-sm text-gray-600">{rec.text}</span>
          </div>
          <div className="text-sm text-gray-700">{rec.details}</div>
        </div>
      ))}

      {transportInfo && (
        <div className="flex items-center gap-2 text-gray-600">
          {getIconByWay(transportInfo.way)}
          <span>{transportInfo.distance}·{transportInfo.duration}</span>
        </div>
      )}
    </div>
  );
};

export default LocationCard;