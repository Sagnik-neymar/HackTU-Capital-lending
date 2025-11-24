"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { client } from "@/lib/prisma"

import { sbiFetch, iciciFetch, hdfcFetch } from "@/actions/tweet-fetch"

let interval: any

type Card = {
    id: number
    name: string
    content: React.ReactNode
}

// ✅ Fetch tweets based on selected bank
export async function fetchTweetCards(bank: string): Promise<Card[]> {
    try {
        let tweets: { id: string; name: string; tweetText: string }[] = []

        if (bank === "ICICI Bank") {
            tweets = await iciciFetch()
        } else if (bank === "SBI Bank") {
            tweets = await sbiFetch()
        } else if (bank === "HDFC Bank") {
            tweets = await hdfcFetch()
        }

        console.log(`Fetched ${tweets.length} tweets for ${bank}:`, tweets) // ✅ Debugging

        // ✅ Convert id to a number and shuffle
        const CARDS: Card[] = tweets.map((tweet) => ({
            id: Number(tweet.id),
            name: tweet.name,
            content: <p>{tweet.tweetText}</p>,
        }))

        CARDS.sort(() => Math.random() - 0.5) // ✅ Shuffle randomly

        return CARDS
    } catch (error) {
        console.error("Error fetching tweets:", error)
        return []
    }
}

export const CardStack = ({
    bank,
    offset = 10,
    scaleFactor = 0.06,
    maxCards = 4,
}: {
    bank: string
    offset?: number
    scaleFactor?: number
    maxCards?: number
}) => {
    const [cards, setCards] = useState<Card[]>([])
    const [isLoading, setIsLoading] = useState(true) // ✅ Added loading state

    useEffect(() => {
        async function loadCards() {
            setIsLoading(true) // Start loading
            const fetchedCards = await fetchTweetCards(bank)
            setCards(fetchedCards)
            setIsLoading(false) // Stop loading
        }

        loadCards()
    }, [bank]) // ✅ Re-fetch tweets when `bank` changes

    useEffect(() => {
        startFlipping()
        return () => clearInterval(interval)
    }, [cards])

    const startFlipping = () => {
        interval = setInterval(() => {
            setCards((prevCards) => {
                if (prevCards.length === 0) return prevCards
                const newArray = [...prevCards]
                newArray.unshift(newArray.pop()!)
                return newArray
            })
        }, 5000)
    }

    return (
        <div className="relative h-60 w-60 md:h-60 md:w-96">
            {isLoading ? (
                <p className="text-center text-gray-500">Loading tweets...</p>
            ) : cards.length === 0 ? (
                <p className="text-center text-gray-500">
                    No tweets available.
                </p>
            ) : (
                cards.slice(0, maxCards).map((card, index) => (
                    <motion.div
                        key={card.id}
                        className="absolute dark:bg-black bg-white h-60 w-60 md:h-60 md:w-96 rounded-xl p-4 shadow-xl border border-neutral-200 dark:border-white/[0.1] shadow-black/[0.1] dark:shadow-white/[0.05] flex flex-col justify-between"
                        style={{ transformOrigin: "top center" }}
                        animate={{
                            top: index * -offset,
                            scale: 1 - index * scaleFactor,
                            zIndex: maxCards - index,
                        }}
                    >
                        <div className="font-normal text-neutral-700 dark:text-neutral-200 text-[1vw]">
                            {card.content}
                        </div>
                        <div>
                            <div className="text-blue-600 font-medium dark:text-white flex items-center">
                                <p className="text-[1vw]">@ </p>
                                <p className="text-[1vw]">{card.name}</p>
                            </div>
                        </div>
                    </motion.div>
                ))
            )}
        </div>
    )
}
