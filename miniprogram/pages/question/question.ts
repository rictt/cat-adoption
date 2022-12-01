Page({
  data: {
    foodQuestionsName: [],
    foodQuestions: [
      {
        question: '猫咪到家可以换猫粮吗',
        answer: '可以，但要遵循7日换粮法，慢慢过渡，不能粗暴换粮。'
      },
      {
        question: '什么样的猫粮才是好猫粮',
        answer: '粗蛋白高于36%；动物性原料尽量多；无谷物；该灵璧合理约1.2:1；原料来源清晰，无不明肉粉；不添加人工游世纪；不额外添加植物蛋白粉等；'
      },
      {
        question: '猫粮该怎么选',
        answer: '猫咪肠胃脆弱或者挑食，首选鸡胸肉，好消化；想要美毛效果的选鱼肉粮，但建议成年之后，避免肠胃负担太大。'
      },
    ],
    foodQuestionsName2: [],
    foodQuestions2: [
      {
        question: '猫2咪到家可以换猫粮吗',
        answer: '可以，但要遵循7日换粮法，慢慢过渡，不能粗暴换粮。'
      },
      {
        question: '什么2样的猫粮才是好猫粮',
        answer: '粗蛋白高于36%；动物性原料尽量多；无谷物；该灵璧合理约1.2:1；原料来源清晰，无不明肉粉；不添加人工游世纪；不额外添加植物蛋白粉等；'
      },
      {
        question: '猫粮该2怎么选',
        answer: '猫咪肠胃脆弱或者挑食，首选鸡胸肉，好消化；想要美毛效果的选鱼肉粮，但建议成年之后，避免肠胃负担太大。'
      },
    ]
  },

  onChange(event) {
    const key = event.currentTarget.dataset.key
    const value = event.detail
    this.setData({
      [key]: value
    });
  },
})