import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';

export interface MobilePopupProps {
  visible: boolean;
  onClose: () => void;
  position?: 'bottom' | 'top' | 'left' | 'right' | 'center';
  mask?: boolean;
  maskClosable?: boolean;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  showCloseIcon?: boolean;
  destroyOnClose?: boolean;
}

const MobilePopup: React.FC<MobilePopupProps> = ({
  visible,
  onClose,
  position = 'bottom',
  mask = true,
  maskClosable = true,
  children,
  className,
  contentClassName,
  showCloseIcon = false,
  destroyOnClose = false,
}) => {
  const [isVisible, setIsVisible] = useState(visible);
  const [isRendered, setIsRendered] = useState(visible);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (visible) {
      setIsRendered(true);
      // Small delay to ensure DOM is ready before animation
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    } else {
      setIsVisible(false);
      // Wait for animation to complete before unmounting
      const timer = setTimeout(() => {
        if (destroyOnClose) {
          setIsRendered(false);
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [visible, destroyOnClose]);

  const handleMaskClick = () => {
    if (maskClosable) {
      onClose();
    }
  };

  const getPositionStyles = (): string => {
    switch (position) {
      case 'bottom':
        return 'items-end';
      case 'top':
        return 'items-start';
      case 'left':
        return 'justify-start';
      case 'right':
        return 'justify-end';
      case 'center':
        return 'items-center justify-center';
      default:
        return 'items-end';
    }
  };

  const getContentStyles = (): string => {
    const baseStyles = 'relative bg-white rounded-t-lg overflow-hidden max-h-[90vh] transition-all duration-300 ease-in-out';
    
    switch (position) {
      case 'bottom':
        return cn(baseStyles, 'w-full rounded-t-lg', isVisible ? 'translate-y-0' : 'translate-y-full');
      case 'top':
        return cn(baseStyles, 'w-full rounded-b-lg', isVisible ? 'translate-y-0' : '-translate-y-full');
      case 'left':
        return cn(baseStyles, 'h-full rounded-r-lg', isVisible ? 'translate-x-0' : '-translate-x-full');
      case 'right':
        return cn(baseStyles, 'h-full rounded-l-lg', isVisible ? 'translate-x-0' : 'translate-x-full');
      case 'center':
        return cn(baseStyles, 'rounded-lg w-[90%] max-w-md', isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0');
      default:
        return cn(baseStyles, 'w-full rounded-t-lg', isVisible ? 'translate-y-0' : 'translate-y-full');
    }
  };

  if (!isMounted || (!isRendered && destroyOnClose)) {
    return null;
  }

  const content = (
    <div 
      className={cn(
        'fixed inset-0 z-200 flex',
        getPositionStyles(),
        !isVisible && 'pointer-events-none',
        className
      )}
    >
      {mask && (
        <div 
          className={cn(
            'absolute inset-0 bg-black transition-opacity duration-300',
            isVisible ? 'opacity-50' : 'opacity-0'
          )}
          onClick={handleMaskClick}
        />
      )}
      <div 
        className={cn(
          getContentStyles(),
          contentClassName
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseIcon && (
          <button 
            className="absolute right-3 top-3 p-2 text-gray-500 hover:text-gray-700 z-10"
            onClick={onClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
        {children}
      </div>
    </div>
  );

  return createPortal(content, document.body);
};

export default MobilePopup;