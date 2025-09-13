import React from 'react';
import { profileData } from '../data/profileData';

const getInitials = (name: string) => {
  const names = name.split(' ');
  if (names.length > 1) {
    return `${names[0][0]}${names[names.length - 1][0]}`;
  }
  return names[0].substring(0, 2);
};

const Hero: React.FC = () => {
  return (
    <div className="text-center py-16 md:py-20 animate-fade-in">
       <div
        className="w-40 h-40 rounded-full mx-auto mb-6 border-4 border-accent shadow-lg flex items-center justify-center bg-secondary"
      >
        <span className="text-5xl font-bold text-highlight">{getInitials(profileData.name)}</span>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-super-light tracking-tight">
        {profileData.name}
      </h1>
      <h2 className="mt-3 text-xl md:text-2xl font-semibold text-highlight">
        {profileData.title}
      </h2>
      <p className="mt-6 max-w-3xl mx-auto text-lg text-light">
        {profileData.summary}
      </p>
    </div>
  );
};

export default Hero;