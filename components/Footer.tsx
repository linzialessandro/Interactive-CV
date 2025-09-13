import React from 'react';
import { profileData } from '../data/profileData';
import { LinkedInIcon } from './icons/LinkedInIcon';
import { GitHubIcon } from './icons/GitHubIcon';
import { EmailIcon } from './icons/EmailIcon';
import { OrcidIcon } from './icons/OrcidIcon';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-light text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Alessandro Linzi. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
             <a href={`mailto:${profileData.contact.email}`} aria-label="Send an email to Alessandro Linzi" className="text-light hover:text-highlight transition-colors duration-300">
              <EmailIcon />
            </a>
            <a href={profileData.contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="View Alessandro Linzi's LinkedIn Profile" className="text-light hover:text-highlight transition-colors duration-300">
              <LinkedInIcon />
            </a>
            <a href={profileData.contact.github} target="_blank" rel="noopener noreferrer" aria-label="View Alessandro Linzi's GitHub Profile" className="text-light hover:text-highlight transition-colors duration-300">
              <GitHubIcon />
            </a>
            <a href={profileData.contact.orcid} target="_blank" rel="noopener noreferrer" aria-label="View Alessandro Linzi's ORCID Profile" className="text-light hover:text-highlight transition-colors duration-300">
              <OrcidIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;