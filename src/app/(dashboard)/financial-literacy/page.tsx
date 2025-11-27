import type { Metadata } from "next"
import FinancialLiteracyQuiz from "./_components/financial-literacy-quiz"

export const metadata: Metadata = {
  title: "Financial Literacy Quiz | LendX",
  description: "Test your financial knowledge with our interactive quiz covering savings, investments, and loans.",
}

export default function FinancialLiteracyPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3 text-balance">Financial Literacy</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Test your knowledge about savings, investments, and loans. Learn something new with each question!
          </p>
        </div>
        <FinancialLiteracyQuiz />
      </div>
    </main>
  )
}
