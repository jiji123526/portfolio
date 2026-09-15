export type HomeContent = {
  name: string;
  links: {
    email: string;
    resume?: string;
    linkedin: string;
  };
};

export const homeContent: HomeContent = {
  name: 'JIWOO JEONG',
  links: {
    email: 'mailto:jiwoo315@ucla.edu',
    linkedin: 'https://www.linkedin.com/in/jiwoo-jeong-9351962b1/',
  },
};
