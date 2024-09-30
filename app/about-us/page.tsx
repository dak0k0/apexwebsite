'use client'
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect} from 'react';
import FrontPageHeader from "./components/FrontPageHeader";

export default function Home() {
    const [opacityVar, setOpacity] = useState<number>(0)
    const [imageX, setImageX] = useState<number>(0)
    const [imageYOffset, setImageYOffset] = useState<number>(0)

    useEffect(() => {
        const handleScroll = () => {
            const scrollPercentage = window.scrollY / window.innerHeight
            setOpacity(scrollPercentage)
        }

        const imageWidth = window.innerWidth / 3
        setImageX(imageWidth)
        const imageYOffset = window.innerHeight / 2 - imageWidth / 3
        setImageYOffset(imageYOffset)

        handleScroll()
        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }

    }, [])

    return (
    <main className="flex w-screen h-[200vh] max-w-screen">
        <FrontPageHeader/>
        <div className="fixed top-0 left-0 h-screen w-[50vw] z-[-1]">
            <div style={{opacity: opacityVar, top: `${imageYOffset}px`}} className="absolute right-10">
                <Image src="/teamphoto.jpg" alt="team photo of APEX" height={2/3*imageX} width={imageX}/>
            </div>
        </div>
        <div className="fixed top-0 right-0 h-screen w-[50vw] z-[-1]">
            <div style={{opacity: opacityVar, top: `${imageYOffset}px`, bottom: `${imageYOffset}px`}} className="absolute left-10 top-0 right-[16.67vw] text-black">
                <div className="w-full h-full flex flex-col justify-center">
                    <div className="font-bold">hey there!</div>
                    <div className="font-bold text-2xl">we are apex dance crew.</div>
                    <div>Established in 2014, we were the first K-Pop dance crew at the University of Virginia (UVA). Our goal has always been to introduce K-Pop and other East Asian music genres to the dance community at UVA. We are a non-audition group open to dancers of all levels, and strive to create a positive, enjoyable environment for everyone.</div>
                </div>
            </div>
        </div>
    </main>
    );
}