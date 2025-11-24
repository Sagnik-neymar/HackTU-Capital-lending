import Image from "next/image"

type Props = {}

const DashboardSnippet = (props: Props) => {
    return (
        <div className="relative py-20 rounded-2xl">
            <div className="w-full h-3/6 absolute rounded-[50%] radial--blur opacity-40 mx-10" />
            <div className="w-full aspect-video relative rounded-2xl overflow-hidden">
                <img
                    className="opacity-[0.95] w-full h-auto object-cover"
                    src="/money1.avif"
                    alt=""
                />
            </div>
        </div>
    )
}

export default DashboardSnippet

//     < video
// src = "/loondry_vid1.mp4"
// className = "opacity-[0.95] w-full h-auto" // Ensure it takes full width and maintains aspect ratio
// autoPlay // Optional: Uncomment if you want it to autoplay
// loop // Optional: Uncomment if you want it to loop
// muted // Optional: Videos often need to be muted to autoplay in browsers
//     />
