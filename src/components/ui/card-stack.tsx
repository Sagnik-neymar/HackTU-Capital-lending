"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

let interval: any

type Card = {
    id: number
    name: string
    content: React.ReactNode
}

export const CardStack = ({
    items,
    offset = 10,
    scaleFactor = 0.06,
    maxCards = 4, // NEW: Limit the number of stacked cards,
}: {
    items: Card[]
    offset?: number
    scaleFactor?: number
    maxCards?: number // NEW PROP: Maximum number of visible cards
}) => {
    const [cards, setCards] = useState<Card[]>(items)

    useEffect(() => {
        startFlipping()
        return () => clearInterval(interval)
    }, [items]) // Restart flipping if items change

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
            {cards.slice(0, maxCards).map(
                (
                    card,
                    index, // ✅ Only display `maxCards`
                ) => (
                    <motion.div
                        key={card.id}
                        className="absolute dark:bg-black bg-white h-60 w-60 md:h-60 md:w-96 rounded-3xl p-4 shadow-xl border border-neutral-200 dark:border-white/[0.1] shadow-black/[0.1] dark:shadow-white/[0.05] flex flex-col justify-between"
                        style={{ transformOrigin: "top center" }}
                        animate={{
                            top: index * -offset,
                            scale: 1 - index * scaleFactor,
                            zIndex: maxCards - index, // ✅ Maintain correct stacking order
                        }}
                    >
                        <div className="font-normal text-neutral-700 dark:text-neutral-200">
                            {card.content}
                        </div>
                        <div>
                            <div className="text-blue-600 font-medium dark:text-white flex items-center">
                                <p>@ </p>
                                <p>{card.name}</p>
                            </div>
                        </div>
                    </motion.div>
                ),
            )}
        </div>
    )
}

{
    /* <p className="text-blue-600 font-medium dark:text-white flex items-center">
    <div>@</div>
    <div>{card.name}</div>
</p> */
}
