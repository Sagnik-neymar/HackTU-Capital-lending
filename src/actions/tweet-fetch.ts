"use server"

import { client } from "@/lib/prisma";
import { getTweetDataFromPage } from "./tweet-scraper";

let tweets_temp: { id: string; name: string; tweetText: string }[] = []
const sbi_url =
    "https://x.com/search?q=sbi%20personal%20loan%20issues%20&src=typed_query&f=live"
    const icici_url =
    "https://x.com/search?q=icici%20personal%20loan%20issues%20&src=typed_query&f=live"
const hdfc_url =
    "https://x.com/search?q=hdfc%20personal%20loan%20issues%20&src=typed_query&f=live"

export const iciciFetch = async () => {
    tweets_temp = await client.iciciTweets.findMany({
        select: { id: true, name: true, tweetText: true },
    })

    if(tweets_temp.length ===0){
        await getTweetDataFromPage(icici_url)
    }
    // if(tweets_temp.length ===0){
    //     await getTweetDataFromPage(icici_url)
    // }
    return tweets_temp
}

export const sbiFetch = async () => {
    tweets_temp = await client.sbiTweets.findMany({
        select: { id: true, name: true, tweetText: true },
    })

    // if(tweets_temp.length ===0){
        //     await getTweetDataFromPage(sbi_url)
        // }
        


    return tweets_temp
}

export const hdfcFetch = async () => {
    tweets_temp = await client.hdfcTweets.findMany({
        select: { id: true, name: true, tweetText: true },
    })

    //     if(tweets_temp.length ===0){
    //     await getTweetDataFromPage(hdfc_url)
    // }

    return tweets_temp
}
