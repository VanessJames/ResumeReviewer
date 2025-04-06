// src/utils.ts
interface MatchResult {
    matchPercentage: number;
    matchedKeywords: string[];
    missingKeywords: string[];
  }
  
  export function extractKeywords(text: string): string[] {
    const stopWords = ['and', 'or', 'with', 'for', 'to', 'in', 'of', 'the', 'a', 'an', 'on', 'at'];
    const words = text.toLowerCase().split(/\W+/);
    const keywords = Array.from(new Set(words.filter(word => word && !stopWords.includes(word))));
    return keywords;
  }
  
  export function calculateMatch(resumeWords: string[], jobKeywords: string[]): MatchResult {
    const matched = jobKeywords.filter(keyword => resumeWords.includes(keyword));
    const missing = jobKeywords.filter(keyword => !resumeWords.includes(keyword));
  
    const matchPercentage = Math.round((matched.length / jobKeywords.length) * 100);
  
    return {
      matchPercentage,
      matchedKeywords: matched,
      missingKeywords: missing,
    };
  }
  