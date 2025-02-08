import puppeteer from "puppeteer"
import { setTimeout } from "timers/promises"
import { client } from "@/lib/prisma"

// Twitter login cookies
const YOUR_AUTH_TOKEN = "32c9bb4ae070b837bb8c2f832c33124f8fd4f1b6"
const YOUR_CT0 =
    "3583f0a82801328b0156a6279cba16f9cf75e295e03d1aca031bde6121ca96ff2cab708882e0aaa8fa818090ddaeab7e7ad66a60f2d7553553a7c5cfeb59cd860db69282c82a4259c44651959da4b2bf"
const YOUR_GUEST_ID = "v1%3A173705935010685606"
const YOUR_TWID = "u%3D1752089602389848064"

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
            await client.sbiTweets.createMany({
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
