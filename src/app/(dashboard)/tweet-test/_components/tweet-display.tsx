"use client";

import React, { useEffect, useRef } from "react";

// Extend window type to include `twttr`
declare global {
    interface Window {
        twttr?: {
            widgets: {
                createTweet: (
                    tweetId: string,
                    element: HTMLElement,
                    options?: Record<string, unknown>
                ) => void;
            };
        };
    }
}

interface TweetDisplayProps {
    tweetId: string;
    width?: number; // Custom width
    scale?: number; // Scale factor
}

const TweetDisplay: React.FC<TweetDisplayProps> = ({ tweetId, width = 500, scale = 1 }) => {
    const tweetRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const loadTwitterScript = () => {
            if (!window.twttr) {
                const script = document.createElement("script");
                script.src = "https://platform.twitter.com/widgets.js";
                script.async = true;
                script.charset = "utf-8";
                document.body.appendChild(script);
            }
        };

        loadTwitterScript();

        const renderTweet = () => {
            if (window.twttr && window.twttr.widgets) {
                if (tweetRef.current) {
                    tweetRef.current.innerHTML = ""; // Clear previous tweet
                    window.twttr.widgets.createTweet(tweetId, tweetRef.current, {
                        theme: "light",
                        align: "center",
                        maxWidth: width,
                    });
                }
            } else {
                setTimeout(renderTweet, 500);
            }
        };

        renderTweet();
    }, [tweetId, width]);

    return (
        <div
            ref={tweetRef}
            className="flex justify-center items-center mx-auto"
            style={{
                transform: `scale(${scale})`,
                transformOrigin: "center", // ✅ This keeps the tweet centered
                width: `${width}px`,
                overflow: "hidden",
            }}
        ></div>
    );
};

export default TweetDisplay;
