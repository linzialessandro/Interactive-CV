import React from 'react';
import { BackIcon } from './icons/BackIcon';

interface BackButtonProps {
    onBack: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onBack }) => (
    <button
      onClick={onBack}
      className="flex items-center gap-2 text-light hover:text-highlight transition-colors duration-300 mb-8 animate-fade-in focus:outline-none focus:ring-1 focus:ring-highlight rounded-md px-2 py-1"
    >
      <BackIcon />
      <span>Back to Home</span>
    </button>
);

export default BackButton;