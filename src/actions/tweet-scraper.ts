// import { client } from "@/lib/prisma"
import puppeteer from "puppeteer";
import { setTimeout } from "timers/promises";
import { client } from "../lib/prisma";

// Twitter login cookies
const YOUR_AUTH_TOKEN = "5a163072acfbd7e9dab95277e1e83a6b30913c04"
const YOUR_CT0 =
    "35cfef1448eb8b8ca5596169f36019f2906dd6c90bb86a493395341402ad511bdcb2cbd744b090dd6eedac445cf3d967e6c46044a2da06e36005dd7f92b6ac841041ca576add6162691ec7b711b01355"
const YOUR_GUEST_ID = "v1%3A175542392799424048"
const YOUR_TWID = "u%3D1993834135933341696"

export async function getTweetDataFromPage(pageUrl: string) {
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()

    // Set Twitter login cookies
    const cookies = [
        { name: "auth_token", value: YOUR_AUTH_TOKEN, domain: ".x.com" },
        { name: "ct0", value: YOUR_CT0, domain: ".x.com" },
        { name: "guest_id", value: YOUR_GUEST_ID, domain: ".x.com" },
        { name: "twid", value: YOUR_TWID, domain: ".x.com" },
    ]
    await page.setCookie(...cookies)

    console.log(`Opening Twitter URL: ${pageUrl}`)
    await page.goto(pageUrl, { waitUntil: "networkidle2" })

    // Scroll down once to ensure at least 5 tweets load
    await page.evaluate(() => window.scrollBy(0, window.innerHeight))
    await setTimeout(1000)

    // Extract the first 5 tweets
    const tweets = await page.evaluate(() => {
        const extractedTweets = []
        const tweetElements = document.querySelectorAll("article")

        for (let i = 0; i < Math.min(5, tweetElements.length); i++) {
            const tweet = tweetElements[i]
            const username = tweet
                .querySelector("a[role='link'] span")
                ?.textContent?.trim()
            const tweetText = tweet
                .querySelector("div[lang]")
                ?.textContent?.trim()

            if (username && tweetText) {
                extractedTweets.push({ name: username, tweetText })
            }
        }
        return extractedTweets
    })

    await browser.close()

    // Store the first 5 tweets in Prisma
    try {
        if (tweets.length > 0) {
            await client.hdfcTweets.createMany({
                data: tweets,
                skipDuplicates: true, // Avoid duplicate entries
            })
            console.log("First 5 tweets successfully stored in Prisma.")
        } else {
            console.log("No tweets extracted.")
        }
    } catch (error) {
        console.error("Error storing tweets in Prisma:", error)
    }

    return tweets
}

const hdfc_url =
    "https://x.com/search?q=hdfc%20personal%20loan%20issues%20&src=typed_query&f=live"
const sbi_url =
    "https://x.com/search?q=sbi%20personal%20loan%20issues%20&src=typed_query&f=live"
const icici_url =
    "https://x.com/search?q=icici%20personal%20loan%20issues%20&src=typed_query&f=live"
const pnb_url =
    "https://x.com/search?q=pnb%20personal%20loan%20issues%20&src=typed_query&f=live"

