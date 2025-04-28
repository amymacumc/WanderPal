import React, { useState, useEffect, ReactNode, Children, cloneElement, isValidElement } from 'react';
import { motion } from 'framer-motion';

interface RotateProps {
  children: ReactNode;
  width?: number;
  height?: number;
  spacing?: number;
  rotationAngle?: number;
  initialActiveIndex?: number;
  onActiveIndexChange?: (index: number) => void;
}

const Rotate: React.FC<RotateProps> = ({
  children,
  width = 800,
  height = 400,
  spacing = 250,
  rotationAngle = 45,
  initialActiveIndex = 1,
  onActiveIndexChange
}) => {
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
  const childrenArray = Children.toArray(children);
  const totalCards = childrenArray.length;

  // Ensure the active index is valid when children change
  useEffect(() => {
    if (activeIndex >= totalCards) {
      setActiveIndex(Math.min(initialActiveIndex, totalCards - 1));
    }
  }, [totalCards, activeIndex, initialActiveIndex]);

  // Notify parent component when active index changes
  useEffect(() => {
    if (onActiveIndexChange) {
      onActiveIndexChange(activeIndex);
    }
  }, [activeIndex, onActiveIndexChange]);

  // Function to handle card click
  const handleCardClick = (index: number) => {
    setActiveIndex(index);
  };

  // Calculate card positions based on active index
  const getCardStyle = (index: number) => {
    if (index === activeIndex) {
      return {
        x: 0,
        rotate: 0,
        zIndex: 5,
      };
    }

    // Cards to the left of active card
    if (index < activeIndex) {
      const offset = activeIndex - index;
      return {
        x: -spacing * offset,
        rotate: -rotationAngle * offset,
        zIndex: 1 - offset,
      };
    }

    // Cards to the right of active card
    const offset = index - activeIndex;
    return {
      x: spacing * offset,
      rotate: rotationAngle * offset,
      zIndex: 1 - offset,
    };
  };

  // Generate background colors based on index
  const getCardColor = (index: number) => {
    const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#1A535C', '#FF9F1C'];
    return colors[index % colors.length];
  };

  return (
    <div
      className="relative flex justify-center items-center"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        perspective: '1000px',
      }}
    >
      {childrenArray.map((child, index) => {
        if (!isValidElement(child)) return null;

        const { x, rotate, zIndex } = getCardStyle(index);

        return (
          <motion.div
            key={index}
            className="absolute cursor-pointer"
            style={{
              width: '250px',
              height: '350px',
              borderRadius: '15px',
              boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
              backgroundColor: getCardColor(index),
              zIndex,
            }}
            initial={false}
            animate={{
              x,
              rotate,
              zIndex,
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
            onClick={() => handleCardClick(index)}
          >
            {cloneElement(child, {
              style: {
                ...child.props.style,
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              },
            })}
          </motion.div>
        );
      })}
    </div>
  );
};

export default Rotate;