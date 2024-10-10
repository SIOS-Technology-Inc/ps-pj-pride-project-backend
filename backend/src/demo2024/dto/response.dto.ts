export class ResponseEmotionScoreDto {
  score: number;
  message: string;
  row: {
    totalScore: number;
    words: { word: string; score: number }[];
  };
}
