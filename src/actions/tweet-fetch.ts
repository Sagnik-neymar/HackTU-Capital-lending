"use server"

import { client } from "@/lib/prisma"

let tweets_temp: { id: string; name: string; tweetText: string }[] = []

export const iciciFetch = async () => {
    tweets_temp = await client.iciciTweets.findMany({
        select: { id: true, name: true, tweetText: true },
    })

    return tweets_temp
}

export const sbiFetch = async () => {
    tweets_temp = await client.sbiTweets.findMany({
        select: { id: true, name: true, tweetText: true },
    })

    return tweets_temp
}

export const hdfcFetch = async () => {
    tweets_temp = await client.hdfcTweets.findMany({
        select: { id: true, name: true, tweetText: true },
    })

    return tweets_temp
}
