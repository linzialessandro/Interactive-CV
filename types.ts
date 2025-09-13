export type View = 'home' | 'experience' | 'education' | 'publications' | 'skills' | 'chatbot' | 'gallery';

export interface Experience {
  title: string;
  company: string;
  period: string;
  responsibilities: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  details?: string;
}

export interface Publication {
    title: string;
    outlet: string;
    date: string;
}

export interface ProfileData {
  name: string;
  title: string;
  summary: string;
  experience: Experience[];
  education: Education[];
  publications: Publication[];
  skills: Record<string, string[]>;
  contact: {
    email: string;
    linkedin: string;
    github: string;
    orcid: string;
    cvUrl: string;
  };
}

export interface ChatMessage {
    sender: 'user' | 'ai';
    text: string;
}