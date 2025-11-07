"use client";
import { Links } from "./links";

interface MobileNavPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNavPanel = ({ isOpen, onClose }: MobileNavPanelProps) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Mobile navigation overlay */}
      <div
        className="md:hidden fixed inset-0 bg-black bg-opacity-70"
        onClick={onClose}
        style={{ zIndex: 99998 }}
      />
      
      {/* Mobile navigation panel */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-80 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ 
          backgroundColor: 'hsl(8, 96%, 20%)', 
          zIndex: 99999 
        }}
        id='mobile-menu'
      >
        <div className='flex flex-col h-full'>
          {/* Close button */}
          <div className='flex justify-end p-4'>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center text-white hover:opacity-50"
              aria-label="Close mobile menu"
            >
              <span className="block w-6 h-0.5 bg-white transform rotate-45 absolute"></span>
              <span className="block w-6 h-0.5 bg-white transform -rotate-45 absolute"></span>
            </button>
          </div>
          
          {/* Navigation links */}
          <div className='flex-1 px-6 py-4' id='mobile-links'>
            <div className='flex flex-col'>
              <Links orientation='vertical' size='mobile' onLinkClick={onClose} showChildPages={true} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};