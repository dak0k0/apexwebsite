'use client'
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect} from 'react';
import { usePathname } from "next/navigation";

const thresholds = [0, 0.15, 0.3, 0.45, 0.6, 0.75];
const opacityDenominators = [1, 0.85, 0.7, 0.55, 0.5, 0.25];

export default function FrontPageHeader() {

  const [logoOffsetX, setLogoOffsetX] = useState<number>(0);
  const [logoOffsetY, setLogoOffsetY] = useState<number>(0);
  const [logoSizeVar, setLogoSize] = useState<number>(0);
  const [opacityVars, setOpacities] = useState<number[]>(new Array(thresholds.length).fill(0))

  const updateOpacities = (scrollPositionPercentage: number) => {
    const newOpacities = thresholds.map((threshold, index) => {
      if (scrollPositionPercentage < threshold) {
        return 0;
      } else {
        return (scrollPositionPercentage - threshold) / opacityDenominators[index];
      }
    });
    setOpacities(newOpacities);
  };

  useEffect(() => {
    
    const handleScroll = () => {
      const scrollPositionPercentage = window.scrollY / window.innerHeight
      
      const initialDims = window.innerWidth / 5
      const finalDims = 0.05 * window.innerWidth

      const initialX = window.innerWidth / 2 - initialDims / 2
      const finalX = 0.01 * window.innerWidth

      const initialY = window.innerHeight / 2 - 0.8*initialDims / 2
      const finalY = 0.01 * window.innerHeight

      const currX = initialX - scrollPositionPercentage * (initialX - finalX)
      const currY = initialY - scrollPositionPercentage * (initialY - finalY)
      const currDims = initialDims - scrollPositionPercentage * (initialDims - finalDims)
      
      setLogoSize(currDims)
      setLogoOffsetX(currX)
      setLogoOffsetY(currY)
      updateOpacities(scrollPositionPercentage)
      
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    
    // Cleanup the event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  if(logoOffsetX == -1){
    return null
  }

  const pathname = usePathname();
  const isActive = pathname === '/about-us';

  return (
    <div>
      <div style={{left:`${logoOffsetX}px`, top:`${logoOffsetY}px`}} className={`fixed`}>
        <Image
          src="/logo.png"
          width={logoSizeVar}
          height={logoSizeVar}
          alt="APEX logo"
          className="animate-fadeIn"
        />
      </div>
      <div className="fixed top-0 left-[7vw] w-[50vw] h-[5vw]">
        <div className="flex flex-row w-full h-full">
          <Link href="/about-us">
              <div style={{opacity: opacityVars[0]}} className={`h-full flex justify-center items-center pl-5 pr-5 text-black ${isActive ? 'bg-black text-white' : 'hover:bg-black hover:text-white transition-colors duration-300 ease-in-out'}`}>
                about us
              </div>
          </Link>
          <Link href="/current-set">
            <div style={{opacity: opacityVars[1]}} className="h-full text-black hover:bg-black hover:text-white transition-colors duration-300 ease-in-out flex justify-center items-center pl-5 pr-5">
              fall 2024 set
            </div>
          </Link>
          <Link href="/past-covers">
            <div style={{opacity: opacityVars[2]}} className="h-full text-black hover:bg-black hover:text-white transition-colors duration-300 ease-in-out flex justify-center items-center pl-5 pr-5">
              dance covers
            </div>
          </Link>
          <Link href="/meet-exec">
            <div style={{opacity: opacityVars[3]}} className="h-full text-black hover:bg-black hover:text-white transition-colors duration-300 ease-in-out flex justify-center items-center pl-5 pr-5">
              meet exec
            </div>
          </Link>
          <Link href="/merch">
            <div style={{opacity: opacityVars[4]}} className="h-full text-black hover:bg-black hover:text-white transition-colors duration-300 ease-in-out flex justify-center items-center pl-5 pr-5">
              merch
            </div>
          </Link>
          <Link href="/join-us">
            <div style={{opacity: opacityVars[5]}} className="h-full text-black hover:bg-black hover:text-white transition-colors duration-300 ease-in-out flex justify-center items-center pl-5 pr-5">
              join us
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
