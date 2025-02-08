

import React from 'react'
import { CardStack } from '@/components/ui/card-stack';
import { cn } from "@/lib/utils";
import { client } from '@/lib/prisma';



export async function fetchTweetCards() {
    try {
        const tweets = await client.iciciTweets.findMany({
            select: { id: true, name: true, tweetText: true },
        });

        // Format tweets into CARDS array
        const CARDS = tweets.map((tweet, index) => ({
            id: index, // Assigning sequential index
            name: tweet.name,
            content: <p>{tweet.tweetText}</p>, // Wrapping tweet text in <p>
        }));

        return CARDS;
    } catch (error) {
        console.error("Error fetching tweets:", error);
        return [];
    }
}



const CARDS = await fetchTweetCards();
const CARDS_2 = CARDS.sort(() => Math.random() - 0.5); 





const Page = () => {

    return (
        <div className="md:px-10 py-20 flex gap-8 items-center justify-center h-screen">
            <CardStack items={CARDS} />
            <CardStack items={CARDS_2} />
        </div>
    );
};

export default Page;
