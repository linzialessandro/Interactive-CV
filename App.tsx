import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import ProfileSection from './components/ProfileSection';
import Chatbot from './components/Chatbot';
import Gallery from './components/Gallery';
import BackButton from './components/BackButton';
import { profileData } from './data/profileData';
import { View } from './types';
import { EducationIcon } from './components/icons/EducationIcon';
import { SkillsIcon } from './components/icons/SkillsIcon';
import { ExperienceIcon } from './components/icons/ExperienceIcon';
import { PublicationIcon } from './components/icons/PublicationIcon';
import { GalleryIcon } from './components/icons/GalleryIcon';
import { ChatIcon } from './components/icons/ChatIcon';
import { DownloadIcon } from './components/icons/DownloadIcon';

const navSections: { id: View; label: string; icon: React.ReactNode }[] = [
    { id: 'experience', label: 'Experience', icon: <ExperienceIcon /> },
    { id: 'education', label: 'Education', icon: <EducationIcon /> },
    { id: 'publications', label: 'Publications', icon: <PublicationIcon /> },
    { id: 'skills', label: 'Skills', icon: <SkillsIcon /> },
    { id: 'gallery', label: 'AI Art Gallery', icon: <GalleryIcon /> },
    { id: 'chatbot', label: 'AI Chat', icon: <ChatIcon /> },
];

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('home');

  const handleNavClick = useCallback((view: View) => {
    setActiveView(view);
    window.scrollTo(0, 0);
  }, []);

  const renderContent = () => {
    if (activeView === 'home') {
      return (
        <>
          <Hero />
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-center animate-fade-in mt-8">
            {navSections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => handleNavClick(section.id)}
                className="w-40 bg-secondary p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-highlight/20 hover:bg-accent transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-highlight"
                style={{ animationDelay: `${index * 100}ms` }}
                aria-label={`Navigate to ${section.label}`}
              >
                <div className="text-highlight w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3">{section.icon}</div>
                <h3 className="font-semibold text-super-light text-sm sm:text-base">{section.label}</h3>
              </button>
            ))}
          </div>
          <div className="mt-12 text-center animate-fade-in" style={{ animationDelay: `${navSections.length * 100}ms` }}>
            <a
              href={profileData.contact.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-highlight text-primary font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-highlight"
            >
              <DownloadIcon />
              <span>View CV</span>
            </a>
          </div>
        </>
      );
    }

    switch (activeView) {
      case 'experience':
        return (
          <>
            <BackButton onBack={() => handleNavClick('home')} />
            <ProfileSection title="Professional Experience" icon={<ExperienceIcon />}>
              {profileData.experience.map((job, index) => (
                <div key={index} className="mb-6 animate-slide-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <h3 className="text-xl font-bold text-highlight">{job.title}</h3>
                  <p className="text-light font-semibold">{job.company} | {job.period}</p>
                  <ul className="mt-2 list-disc list-inside text-super-light/90 space-y-1">
                    {job.responsibilities.map((resp, i) => <li key={i}>{resp}</li>)}
                  </ul>
                </div>
              ))}
            </ProfileSection>
          </>
        );
      case 'education':
        return (
          <>
            <BackButton onBack={() => handleNavClick('home')} />
            <ProfileSection title="Education" icon={<EducationIcon />}>
              {profileData.education.map((edu, index) => (
                <div key={index} className="mb-6 animate-slide-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <h3 className="text-xl font-bold text-super-light">{edu.degree}</h3>
                  <p className="text-light font-semibold">{edu.institution} | {edu.period}</p>
                  {edu.details && <p className="mt-1 text-super-light/80">{edu.details}</p>}
                </div>
              ))}
            </ProfileSection>
          </>
        );
      case 'publications':
        return (
          <>
            <BackButton onBack={() => handleNavClick('home')} />
            <ProfileSection title="Publications" icon={<PublicationIcon />}>
              {profileData.publications.map((pub, index) => (
                <div key={index} className="mb-4 animate-slide-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <h3 className="text-lg font-semibold text-super-light">"{pub.title}"</h3>
                  <p className="text-light">{pub.outlet} ({pub.date})</p>
                </div>
              ))}
            </ProfileSection>
          </>
        );
      case 'skills':
        return (
          <>
            <BackButton onBack={() => handleNavClick('home')} />
            <ProfileSection title="Skills" icon={<SkillsIcon />}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Object.entries(profileData.skills).map(([category, skills], index) => (
                  <div key={category} className="animate-slide-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                    <h3 className="text-lg font-bold text-highlight mb-3 border-b-2 border-accent pb-2">{category}</h3>
                    <ul className="flex flex-wrap gap-2">
                      {skills.map(skill => (
                        <li key={skill} className="bg-accent text-super-light text-sm font-medium px-3 py-1 rounded-full transition-colors duration-300 hover:bg-highlight hover:text-primary cursor-default">
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </ProfileSection>
          </>
        );
      case 'gallery':
        return (
          <>
            <BackButton onBack={() => handleNavClick('home')} />
            <Gallery />
          </>
        );
      case 'chatbot':
        return (
          <div className="max-w-4xl mx-auto">
            <BackButton onBack={() => handleNavClick('home')} />
            <Chatbot />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col">
      <Header onHomeClick={() => handleNavClick('home')} />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;