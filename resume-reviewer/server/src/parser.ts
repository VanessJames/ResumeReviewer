// src/parser.ts
export interface ParsedResume {
    text: string;
    skills: string[];
    experience: string[];
    education: string[];
  }
  
  export function parseResume(resumeText: string): ParsedResume {
    const lowerText = resumeText.toLowerCase();
  
    const skills = extractSkills(resumeText);
    const experience = extractSection(resumeText, /(experience|work history)/i);
    const education = extractSection(resumeText, /(education|qualifications)/i);
  
    return {
      text: resumeText,
      skills,
      experience,
      education,
    };
  }
  
  function extractSkills(text: string): string[] {
    const skillsList = [
      'python', 'javascript', 'typescript', 'react', 'node.js', 'express', 'django',
      'sql', 'mongodb', 'html', 'css', 'java', 'aws', 'azure', 'git', 'docker', 'kubernetes'
    ];
    const foundSkills = skillsList.filter(skill => text.toLowerCase().includes(skill));
    return foundSkills;
  }
  
  function extractSection(text: string, pattern: RegExp): string[] {
    const lines = text.split('\n');
    const section: string[] = [];
  
    let recording = false;
    for (const line of lines) {
      if (pattern.test(line)) {
        recording = true;
        continue;
      }
  
      if (recording && line.trim() === '') break;
  
      if (recording) section.push(line.trim());
    }
  
    return section;
  }
  