import React from 'react';

interface ProfileSectionProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ title, icon, children }) => {
  return (
    <section className="py-8 animate-fade-in">
      <div className="flex items-center mb-6">
        {icon && <span className="mr-4 text-highlight">{icon}</span>}
        <h2 className="text-3xl font-bold text-super-light">{title}</h2>
      </div>
      <div className="bg-secondary p-6 md:p-8 rounded-lg shadow-xl">
        {children}
      </div>
    </section>
  );
};

export default ProfileSection;
