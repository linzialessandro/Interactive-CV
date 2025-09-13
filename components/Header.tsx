import React from 'react';

interface HeaderProps {
  onHomeClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onHomeClick }) => {
  return (
    <header className="bg-secondary/50 backdrop-blur-sm sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <button onClick={onHomeClick} className="focus:outline-none" aria-label="Go to homepage">
              <h1 className="text-2xl font-bold text-super-light hover:text-highlight transition-colors duration-300">
                Alessandro Linzi
              </h1>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
