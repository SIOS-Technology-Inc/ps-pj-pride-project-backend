export class PromptResultType {
  winner: 'user' | 'system';
  combatLogs: {
    round: number;
    combatLog: string;
  }[];
}

export class PromptResultEmotionScoreType {
  totalScore: number;
  words: { word: string; score: number }[];
}
