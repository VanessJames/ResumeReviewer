// Very basic keyword extractor – could be improved with better NLP later
export const extractKeywords = (text: string): string[] => {
    const stopWords = new Set([
      'and', 'or', 'the', 'a', 'an', 'with', 'for', 'to', 'of', 'in', 'on', 'by', 'as', 'is', 'are',
      'this', 'that', 'will', 'be', 'you', 'your', 'we', 'our', 'at'
    ]);
  
    return [...new Set(
      text
        .toLowerCase()
        .match(/\b[a-z]{3,}\b/g)
        ?.filter(word => !stopWords.has(word)) || []
    )];
  };
  
  export const compareResumeToKeywords = (resume: string, keywords: string[]) => {
    const resumeText = resume.toLowerCase();
    const matchedKeywords: string[] = [];
    const unmatchedKeywords: string[] = [];
  
    for (const keyword of keywords) {
      if (resumeText.includes(keyword)) {
        matchedKeywords.push(keyword);
      } else {
        unmatchedKeywords.push(keyword);
      }
    }
  
    const matchPercentage = Math.round((matchedKeywords.length / keywords.length) * 100);
  
    return { matchedKeywords, unmatchedKeywords, matchPercentage };
  };
  