import generatedContent from './content.generated.json';

export type ProjectSection = {
  title: string;
  content: string;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  role?: string;
  year?: string;
  link?: string;
  tools?: string[];
  images?: string[];
  cardImage: string;
  coverImage: string;
  sections: ProjectSection[];
};

type ContentData = {
  brand: {
    name: string;
    copy: string;
  };
  home: {
    subtitle: string;
    heading: string;
    description: string;
    heroImage: string;
  };
  about: {
    heading: string;
    headline?: string;
    focus?: string;
    tools?: string[];
    description: string;
    points?: Array<{ title: string; text: string }>;
    education?: Array<{ institution: string; degree: string; focus: string; years: string; institutionUrl?: string }>;
    workExperience?: Array<{ company: string; role: string; focus: string; years: string; companyUrl?: string }>;
  };
  projects: Project[];
};

export const content = generatedContent as ContentData;
