export const WORLDS = [
  { id: 'recruiter', label: 'Recruiter', blurb: 'One-page résumé, fast to scan.', color: '#e8e2d4' },
  { id: 'designer', label: 'Designer', blurb: 'Interfaces, screens and a phone you can use.', color: '#c084fc' },
  { id: 'ai', label: 'AI Engineer', blurb: 'Models, pipelines and how they are built.', color: '#4ade80' },
  { id: 'analyst', label: 'Analyst', blurb: 'Data work as case studies and numbers.', color: '#fbbf24' },
] as const;
export type WorldId = typeof WORLDS[number]['id'];
