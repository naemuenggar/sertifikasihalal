declare module "stopword" {
  export const ind: string[];
  export function removeStopwords(tokens: string[], stopwords: string[]): string[];
}
