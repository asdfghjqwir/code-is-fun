export interface MissionValues {
  userName: string
  rows: number
  score: number
  foods: string[]
  calls: string[]
}

export interface MissionView {
  codeLines: string[]
  outputLines: string[]
}

/** 選んでいるミッションの「コード」と「実行結果」を組み立てる */
export function buildMissionView(mission: number, values: MissionValues): MissionView {
  const { userName, rows, score, foods, calls } = values

  if (mission === 0) {
    return {
      codeLines: ['name = "' + userName + '"', 'print("こんにちは、" + name + "さん！")'],
      outputLines: ['こんにちは、' + userName + 'さん！'],
    }
  }

  if (mission === 1) {
    const outputLines: string[] = []
    for (let i = 0; i < rows; i++) {
      outputLines.push('★'.repeat(i + 1))
    }
    return {
      codeLines: ['for i in range(' + rows + '):', '    print("★" * (i + 1))'],
      outputLines,
    }
  }

  if (mission === 2) {
    let message = 'あと少し！もう一回！'
    if (score === 100) {
      message = '満点！天才！'
    } else if (score >= 80) {
      message = '合格！すごい！'
    }
    return {
      codeLines: [
        'score = ' + score,
        '',
        'if score == 100:',
        '    print("満点！天才！")',
        'elif score >= 80:',
        '    print("合格！すごい！")',
        'else:',
        '    print("あと少し！もう一回！")',
      ],
      outputLines: [message],
    }
  }

  if (mission === 3) {
    return {
      codeLines: [
        'foods = [' + foods.map((f) => '"' + f + '"').join(', ') + ']',
        '',
        'for food in foods:',
        '    print(food + "が好き！")',
      ],
      outputLines: foods.map((f) => f + 'が好き！'),
    }
  }

  return {
    codeLines: [
      'def hello(name):',
      '    print("こんにちは、" + name + "！")',
      '',
      ...calls.map((name) => 'hello("' + name + '")'),
    ],
    outputLines: calls.map((name) => 'こんにちは、' + name + '！'),
  }
}
