"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { ArrowRight, BookOpen, CheckCircle2, Landmark, RotateCcw, TrendingUp, Wallet, XCircle } from "lucide-react"
import { useState } from "react"
import TypewriterText from "./typewriter-text"

interface Question {
  id: number
  category: "savings" | "investments" | "loans"
  question: string
  options: string[]
  correctAnswer: number
  explanations: {
    correct: string
    incorrect: string[]
  }
}

const questions: Question[] = [
  {
    id: 1,
    category: "savings",
    question: "What is the primary purpose of an emergency fund?",
    options: [
      "To invest in stocks for higher returns",
      "To cover unexpected expenses without going into debt",
      "To pay for planned vacations",
      "To maximize interest earnings",
    ],
    correctAnswer: 1,
    explanations: {
      correct:
        "An emergency fund is designed to cover 3-6 months of living expenses for unexpected situations like job loss, medical emergencies, or urgent repairs. This financial safety net prevents you from taking on high-interest debt during crises.",
      incorrect: [
        "Investing in stocks is for long-term wealth building, not emergency preparedness. Emergency funds should be liquid and low-risk, easily accessible when needed.",
        "Vacation funds are separate savings goals. Emergency funds are specifically for unplanned, essential expenses that could otherwise destabilize your finances.",
        "While emergency funds do earn interest in savings accounts, maximizing returns isn't their primary purpose. Accessibility and security are more important.",
      ],
    },
  },
  {
    id: 2,
    category: "investments",
    question: "What does 'diversification' mean in investing?",
    options: [
      "Putting all your money in the best-performing stock",
      "Spreading investments across different asset types to reduce risk",
      "Only investing in government bonds",
      "Changing your investments every month",
    ],
    correctAnswer: 1,
    explanations: {
      correct:
        "Diversification means spreading your investments across different asset classes (stocks, bonds, real estate), sectors, and geographical regions. This strategy reduces risk because poor performance in one area can be offset by better performance in others.",
      incorrect: [
        "Concentrating all money in one stock is the opposite of diversification. This approach exposes you to significant risk if that company underperforms or fails.",
        "While bonds are part of a diversified portfolio, investing only in government bonds limits growth potential and doesn't provide true diversification across asset types.",
        "Frequent trading based on short-term trends isn't diversification—it's market timing, which often leads to higher costs and lower returns for most investors.",
      ],
    },
  },
  {
    id: 3,
    category: "loans",
    question: "What is the Annual Percentage Rate (APR) on a loan?",
    options: [
      "The monthly payment amount",
      "The total cost of borrowing including interest and fees, expressed as a yearly rate",
      "The down payment required",
      "The loan approval score",
    ],
    correctAnswer: 1,
    explanations: {
      correct:
        "APR represents the true yearly cost of borrowing, including the interest rate plus any additional fees. It's the most accurate way to compare loan offers because it captures the complete cost, not just the interest rate.",
      incorrect: [
        "Monthly payment amount depends on the loan principal, APR, and term length. APR helps calculate these payments but isn't the payment itself.",
        "Down payment is an upfront amount you pay when taking a loan, typically for mortgages or auto loans. It's separate from the APR calculation.",
        "There's no such thing as a 'loan approval score.' Lenders use credit scores to evaluate applications, but APR is the cost rate, not an approval metric.",
      ],
    },
  },
  {
    id: 4,
    category: "savings",
    question: "What is compound interest?",
    options: [
      "Interest calculated only on the initial principal",
      "Interest earned on both the principal and previously accumulated interest",
      "A fixed interest rate that never changes",
      "Interest paid at the end of a loan term",
    ],
    correctAnswer: 1,
    explanations: {
      correct:
        "Compound interest is often called 'interest on interest.' Your earnings generate their own earnings over time, creating exponential growth. This is why starting to save early is so powerful—time amplifies the compounding effect significantly.",
      incorrect: [
        "Interest calculated only on the principal is called 'simple interest.' It grows linearly, unlike compound interest which grows exponentially over time.",
        "Interest rates can be fixed or variable, but that's a separate concept from compounding. Compound interest describes how interest accumulates, not whether the rate changes.",
        "Interest payment timing varies by loan type, but this describes payment schedule, not the compounding mechanism. Compound interest is about how interest builds over time.",
      ],
    },
  },
  {
    id: 5,
    category: "investments",
    question: "What is a mutual fund?",
    options: [
      "A type of bank account with high interest",
      "A loan you give to the government",
      "A pooled investment that collects money from many investors to buy securities",
      "An insurance policy for investments",
    ],
    correctAnswer: 2,
    explanations: {
      correct:
        "A mutual fund pools money from many investors to purchase a diversified portfolio of stocks, bonds, or other securities. Managed by professional fund managers, it offers instant diversification and access to investments that might be difficult to buy individually.",
      incorrect: [
        "Bank accounts and mutual funds are different financial products. Savings accounts offer FDIC insurance and lower returns, while mutual funds are investments with market risk and higher growth potential.",
        "When you lend money to the government, you're buying government bonds or treasury securities—not mutual funds. These are fixed-income investments with different risk profiles.",
        "Investment insurance products like annuities exist, but mutual funds themselves aren't insurance. They're investment vehicles with no guaranteed returns.",
      ],
    },
  },
  {
    id: 6,
    category: "loans",
    question: "What happens if you only pay the minimum amount on your credit card?",
    options: [
      "Your balance is paid off within a year",
      "You avoid all interest charges",
      "You pay significantly more in interest over time",
      "Your credit limit increases automatically",
    ],
    correctAnswer: 2,
    explanations: {
      correct:
        "Paying only the minimum keeps your account in good standing but allows interest to compound on the remaining balance. A $5,000 balance at 20% APR with minimum payments could take over 20 years to pay off and cost thousands in interest.",
      incorrect: [
        "Minimum payments are designed to keep debt outstanding longer. They typically cover just the interest plus a small portion of principal, extending payoff time significantly.",
        "Interest charges apply to any unpaid balance after the grace period. Only paying the full statement balance by the due date avoids interest charges.",
        "Credit limit increases aren't automatic and aren't tied to minimum payments. Card issuers consider factors like payment history, income, and credit utilization.",
      ],
    },
  },
  {
    id: 7,
    category: "savings",
    question: "What is the recommended percentage of income to save each month?",
    options: ["1-5%", "10-20%", "50-60%", "100% after bills"],
    correctAnswer: 1,
    explanations: {
      correct:
        "Financial experts generally recommend saving 10-20% of your gross income. The popular 50/30/20 rule suggests 50% for needs, 30% for wants, and 20% for savings and debt repayment. This creates a sustainable balance between present living and future security.",
      incorrect: [
        "While saving 1-5% is better than nothing, it's generally insufficient for building substantial wealth or a robust emergency fund over time, especially considering inflation.",
        "Saving 50-60% is an aggressive savings rate achievable by few. While admirable for early retirement goals, it's not realistic for most households and may be unsustainable.",
        "Saving everything after bills leaves no room for discretionary spending and is typically unsustainable long-term. Balance is key to a healthy financial lifestyle.",
      ],
    },
  },
  {
    id: 8,
    category: "investments",
    question: "What is the main risk of investing in individual stocks?",
    options: [
      "Guaranteed loss of money",
      "Company-specific risk and high volatility",
      "Money is locked for 10 years",
      "You must be a professional to invest",
    ],
    correctAnswer: 1,
    explanations: {
      correct:
        "Individual stocks carry company-specific risk—if that company faces challenges, your investment could lose significant value. Stock prices can be highly volatile, swinging dramatically based on earnings, news, or market sentiment, making them riskier than diversified investments.",
      incorrect: [
        "Stock investments aren't guaranteed to lose money—many grow substantially over time. However, there's always risk of loss, which is why diversification and long-term thinking are important.",
        "Most stocks can be sold any business day; they're among the most liquid investments. Some retirement accounts have restrictions, but stocks themselves aren't time-locked.",
        "Anyone can invest in stocks through brokerage accounts. While professional knowledge helps, many successful investors are individuals who invest consistently in diversified portfolios.",
      ],
    },
  },
  {
    id: 9,
    category: "loans",
    question: "What is collateral in the context of a loan?",
    options: [
      "The interest rate on the loan",
      "An asset pledged as security that the lender can seize if you default",
      "A co-signer's signature",
      "The loan application fee",
    ],
    correctAnswer: 1,
    explanations: {
      correct:
        "Collateral is an asset you pledge to secure a loan—like your home for a mortgage or car for an auto loan. If you fail to repay, the lender can seize this asset to recover their money. Secured loans typically offer lower interest rates because they're less risky for lenders.",
      incorrect: [
        "Interest rate is the cost of borrowing expressed as a percentage, not security for the loan. Rates may be lower on collateralized loans, but they're separate concepts.",
        "A co-signer provides additional repayment assurance by agreeing to pay if you default, but they're not collateral. Co-signers are people; collateral is property or assets.",
        "Application fees are upfront costs charged by some lenders, unrelated to loan security. They don't protect the lender if you stop making payments.",
      ],
    },
  },
  {
    id: 10,
    category: "savings",
    question: "What is the 'pay yourself first' strategy?",
    options: [
      "Paying all bills before spending on entertainment",
      "Automatically saving a portion of income before paying any expenses",
      "Only buying things for yourself",
      "Paying off debt before saving anything",
    ],
    correctAnswer: 1,
    explanations: {
      correct:
        "Pay yourself first means automatically transferring money to savings as soon as you receive income—before bills or discretionary spending. This prioritizes your future financial security and ensures saving happens consistently, rather than saving whatever's left over.",
      incorrect: [
        "Paying bills first is responsible but different from 'pay yourself first.' That strategy prioritizes future savings even before current obligations, treating saving as a non-negotiable expense.",
        "This phrase isn't about personal purchases. It's about prioritizing your future self by building savings and investments before spending on immediate wants or needs.",
        "While paying off high-interest debt is important, 'pay yourself first' emphasizes consistent saving. Many financial experts recommend doing both simultaneously, even if in small amounts.",
      ],
    },
  },
]

const categoryIcons = {
  savings: Wallet,
  investments: TrendingUp,
  loans: Landmark,
}

const categoryColors = {
  savings: "text-emerald-500",
  investments: "text-blue-500",
  loans: "text-amber-500",
}

export default function FinancialLiteracyQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [quizComplete, setQuizComplete] = useState(false)
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(new Array(questions.length).fill(false))

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100
  const CategoryIcon = categoryIcons[question.category]

  const handleAnswerSelect = (index: number) => {
    if (showExplanation) return

    setSelectedAnswer(index)
    setShowExplanation(true)

    const newAnswered = [...answeredQuestions]
    newAnswered[currentQuestion] = true
    setAnsweredQuestions(newAnswered)

    if (index === question.correctAnswer) {
      setScore((prev) => prev + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setQuizComplete(true)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setScore(0)
    setQuizComplete(false)
    setAnsweredQuestions(new Array(questions.length).fill(false))
  }

  const getExplanation = () => {
    if (selectedAnswer === null) return ""
    if (selectedAnswer === question.correctAnswer) {
      return question.explanations.correct
    }
    return question.explanations.incorrect[
      selectedAnswer > question.correctAnswer ? selectedAnswer - 1 : selectedAnswer
    ]
  }

  if (quizComplete) {
    const percentage = Math.round((score / questions.length) * 100)
    let message = ""
    let messageColor = ""

    if (percentage >= 80) {
      message = "Excellent! You have strong financial literacy skills!"
      messageColor = "text-emerald-500"
    } else if (percentage >= 60) {
      message = "Good job! Keep learning to improve your financial knowledge."
      messageColor = "text-blue-500"
    } else {
      message = "Keep practicing! Financial literacy is a journey."
      messageColor = "text-amber-500"
    }

    return (
      <Card className="max-w-5xl mx-auto shadow-lg border-border/50">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <BookOpen className="w-10 h-10 text-primary" />
          </div>
          <CardTitle className="text-2xl">Quiz Complete!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="space-y-2">
            <p className="text-5xl font-bold text-primary">
              {score}/{questions.length}
            </p>
            <p className="text-muted-foreground">Questions Correct</p>
          </div>

          <div className="space-y-2">
            <Progress value={percentage} className="h-3" />
            <p className="text-sm text-muted-foreground">{percentage}% Score</p>
          </div>

          <p className={cn("text-lg font-medium", messageColor)}>{message}</p>

          <Button onClick={handleRestart} size="lg" className="gap-2">
            <RotateCcw className="w-4 h-4" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Progress Section */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span>
            Score: {score}/{answeredQuestions.filter(Boolean).length}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Question Card */}
        <Card className="shadow-lg border-border/50 flex-1">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2 mb-2">
              <div className={cn("p-1.5 rounded-md bg-muted", categoryColors[question.category])}>
                <CategoryIcon className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium text-muted-foreground capitalize">{question.category}</span>
            </div>
            <CardTitle className="text-xl leading-relaxed">{question.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index
              const isCorrect = index === question.correctAnswer
              const showResult = showExplanation

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showExplanation}
                  className={cn(
                    "w-full p-4 text-left rounded-lg border-2 transition-all duration-200",
                    "hover:border-primary/50 hover:bg-muted/50",
                    "disabled:cursor-default disabled:hover:border-border disabled:hover:bg-transparent",
                    !showResult && isSelected && "border-primary bg-primary/5",
                    !showResult && !isSelected && "border-border",
                    showResult && isCorrect && "border-emerald-500 bg-emerald-500/10",
                    showResult && isSelected && !isCorrect && "border-red-500 bg-red-500/10",
                    showResult && !isSelected && !isCorrect && "border-border opacity-50",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0",
                        !showResult && "bg-muted text-muted-foreground",
                        showResult && isCorrect && "bg-emerald-500 text-white",
                        showResult && isSelected && !isCorrect && "bg-red-500 text-white",
                        showResult && !isSelected && !isCorrect && "bg-muted text-muted-foreground",
                      )}
                    >
                      {showResult && isCorrect ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : showResult && isSelected && !isCorrect ? (
                        <XCircle className="w-5 h-5" />
                      ) : (
                        String.fromCharCode(65 + index)
                      )}
                    </div>
                    <span
                      className={cn(
                        "text-foreground",
                        showResult && !isCorrect && !isSelected && "text-muted-foreground",
                      )}
                    >
                      {option}
                    </span>
                  </div>
                </button>
              )
            })}
          </CardContent>
        </Card>

        {/* Explanation Card - Now on the right */}
        <div className="flex-1 lg:max-w-md">
          {showExplanation ? (
            <Card
              className={cn(
                "shadow-lg border-2 h-full",
                selectedAnswer === question.correctAnswer
                  ? "border-emerald-500/50 bg-emerald-500/5"
                  : "border-amber-500/50 bg-amber-500/5",
              )}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  {selectedAnswer === question.correctAnswer ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400">Correct!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-amber-500" />
                      <span className="text-amber-600 dark:text-amber-400">Not quite right</span>
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-muted-foreground leading-relaxed min-h-[120px]">
                  <TypewriterText text={getExplanation()} speed={15} />
                </div>
                <Button onClick={handleNext} className="w-full gap-2" size="lg">
                  {currentQuestion < questions.length - 1 ? (
                    <>
                      Next Question
                      <ArrowRight className="w-4 h-4" />
                    </>
                  ) : (
                    "See Results"
                  )}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-lg border-border/50 border-dashed h-full flex items-center justify-center min-h-[300px]">
              <CardContent className="text-center text-muted-foreground">
                <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Select an answer to see the explanation</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
