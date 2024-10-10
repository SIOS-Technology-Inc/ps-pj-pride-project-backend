import { Injectable } from '@nestjs/common';
import { EnvironmentsService } from 'src/config/enviroments.service';
import { PromptResultEmotionScoreType, PromptResultType } from 'src/types/promptContent';

@Injectable()
export class PromptAoaiService {
  constructor(private readonly env: EnvironmentsService) {}

  async battlePrompot(characterPrompt: string, enemyPrompt: string): Promise<string> {
    const AOAIClient = this.env.AOAIClientGPT4o();
    const systemPrompt = `
      あなたは決闘の審判です。二つのキャラクターの戦闘を見守り、勝敗までの流れを判定してください。
      AI側がチャンピオン、ユーザー側が挑戦者です。
      次の内容は必ず守ってください「チャンピオンのキャラクターが勝利した場合はsystem、挑戦者が勝利した場合はuserと明記してください。」
      ---
      ${enemyPrompt}
      ---
      以下のType出力を守った内容を最後に付録として記載してください。
      ---
      {
        "combatLogs": {
          "round":number,
          "combatLog":string
        }[]
      }
      ---
      例は以下のようになります。combatLogは小説家のように過大に脚色して演出してください。決闘の勝者を明確にしてください。
      ---
      {
        "combatLogs": [
          {
            "round": 1,
            "combatLog": "訓練場の教官が鉄の剣で攻撃しました"
          },
          {
            "round": 2,
            "combatLog": "訓練場の教官が鉄の盾で防御しました"
          }
        ]
      }
      ---
    `;
    const result = await AOAIClient.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        { role: 'user', content: characterPrompt },
      ],
      model: '',
    });
    const choice = result.choices[0].message.content || 'AOAIの返答がありません';
    return choice;
  }

  async tutorialBattlesPropmpt(characterPrompt: string): Promise<string> {
    const AOAIClient = this.env.AOAIClientGPT4o();
    const systemPrompt = `
      あなたは決闘の審判です。二つのキャラクターの戦闘を見守り、勝敗までの流れを判定してください。
      AI側がチャンピオン、ユーザー側が挑戦者です。
      次の内容は必ず守ってください「チャンピオンのキャラクターが勝利した場合はsystem、挑戦者が勝利した場合はuserと明記してください。」
      決闘の勝者を明確にしてください。内容は小説のように過大に脚色して演出してください。
      ---
      訓練場の教官
      - 基本装備は鉄の剣と鉄の盾
      - 足を負傷しているが歴戦の猛者である
      - 訓練場の教官であるため決闘の際は力を制限している
      ---
    `;
    const result = await AOAIClient.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        { role: 'user', content: characterPrompt },
      ],
      model: '',
    });
    const choice = result.choices[0].message.content || 'AOAIの返答がありません';
    return choice;
  }

  async jsonFormatConverter(jsonString: string): Promise<PromptResultType> {
    const AOAIClient = this.env.AOAIClientGPT35();

    const systemPrompt = `
    - 出力をJSON形式にしてフォーマットとしては以下のサンプルに従ってください。
    - 以下の形式のJSON以外は出力しないでください。
    - AI側がチャンピオン、ユーザー側が挑戦者です。
    - winnerには挑戦者が買った場合は「user」、チャンピオン側が買った場合は「system」を入力してください。
    - winnerには「user」か「system」しか入力しないでください。
    {
        "winner":"user"|"system",
        "combatLogs": {
          "round":number,
          "combatLog":string
        }[]
    }
    `;

    const result = await AOAIClient.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: jsonString },
      ],
      model: '',
    });
    const choice: PromptResultType = JSON.parse(result.choices[0].message.content);

    return choice;
  }

  async EmotionScorePrompt(message: string): Promise<string> {
    const AOAIClient = this.env.AOAIClientGPT4o();
    const systemPrompt = `
        以下の条件で文字列を採点してください。
        - 文節ごとに区切って、文節ごとに得点をつけてください。
        - ポジティブな単語ほど高い得点をつけてください。
        - ネガティブな単語ほど低い得点をつけてください。
        - 得点は100点から-100点までの範囲で評価してください。
        - 得点が5の倍数にならないようにしてください。
        - 同じ単語が複数回出てきた場合は、2つ目以降は得点を0にしてください。
        - 文節ごとに得点を加算してください。
        - 合計得点と文節ごとの得点を出力してください。
        - 出力をJSON形式にしてフォーマットとしては以下に従ってください。また、このJSON以外は出力しないでください。
        {
            "totalScore": 116,
            "words": [
                {"word": "美味しい", "score": 71},
                {"word": "ご飯を", "score": 32},
                {"word": "食べる", "score": 13},
            ],
        }
    `;
    const result = await AOAIClient.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },

        {
          role: 'user',
          content: 'いつも色々と配慮して頂き本当に感謝です',
        },
        {
          role: 'assistant',
          content: `
                    {
                        "totalScore": 127,
                        "words": [
                            {"word": "いつも", "score": 3},
                            {"word": "色々と", "score": -7},
                            {"word": "配慮して", "score": 14},
                            {"word": "頂き", "score": 38},
                            {"word": "本当に", "score": 6},
                            {"word": "感謝です", "score": 73},
                        ],
                    }
                `,
        },
        {
          role: 'user',
          content: '今週は忙しすぎてしんどい',
        },
        {
          role: 'assistant',
          content: `
                    {
                        "totalScore": -84,
                        "words": [
                            {"word": "今週は", "score": 19},
                            {"word": "忙しすぎて", "score": -21},
                            {"word": "しんどい", "score": -82},
                        ],
                    }
                        `,
        },
        { role: 'user', content: message },
      ],
      model: '',
    });
    const choice = result.choices[0].message.content || 'AOAIの返答がありません';
    return choice;
  }
  async EmotionScoreJsonFormatConverter(jsonString: string): Promise<PromptResultEmotionScoreType> {
    const AOAIClient = this.env.AOAIClientGPT35();
    const systemPrompt = `
                    - 出力をJSON形式にしてフォーマットとしては以下のサンプルに従ってください。
                    {
                        "totalScore": 116,
                        "words": [
                            {"word": "美味しい", "score": 71},
                            {"word": "ご飯を", "score": 32},
                            {"word": "食べる", "score": 13},
                        ],
                    }
    `;
    const result = await AOAIClient.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        { role: 'user', content: jsonString },
      ],
      model: '',
    });
    const choice: PromptResultEmotionScoreType = JSON.parse(result.choices[0].message.content);

    return choice;
  }
}
