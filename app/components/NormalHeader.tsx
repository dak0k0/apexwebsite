'use client'
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect} from 'react';
import { usePathname } from "next/navigation";

export default function FrontPageHeader({ path }: { path: string }) {

  const [logoOffsetX, setLogoOffsetX] = useState<number>(0);
  const [logoOffsetY, setLogoOffsetY] = useState<number>(0);
  const [logoSizeVar, setLogoSize] = useState<number>(0);

  useEffect(() => {
    
    const handleScroll = () => {
      
      const finalDims = 0.05 * window.innerWidth
      const finalX = 0.01 * window.innerWidth
      const finalY = 0.01 * window.innerHeight

      setLogoSize(finalDims)
      setLogoOffsetX(finalX)
      setLogoOffsetY(finalY)
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

  return (
    <div>
      <div style={{left:`${logoOffsetX}px`, top:`${logoOffsetY}px`}} className={`fixed`}>
        <Image
          src="/logo.png"
          width={logoSizeVar}
          height={logoSizeVar}
          alt="APEX logo"
        />
      </div>
      <div className="fixed top-0 left-[7vw] w-[50vw] h-[5vw]">
        <div className="flex flex-row w-full h-full">
          <Link href="/about-us">
              <div className={`h-full flex justify-center items-center pl-5 pr-5 text-black ${pathname === '/about-us' ? 'bg-black text-white' : 'hover:bg-black hover:text-white transition-colors duration-300 ease-in-out'}`}>
                about us
              </div>
          </Link>
          <Link href="/current-set">
            <div className={`h-full flex justify-center items-center pl-5 pr-5 text-black ${pathname === '/current-set' ? 'bg-black text-white' : 'hover:bg-black hover:text-white transition-colors duration-300 ease-in-out'}`}>
              fall 2024 set
            </div>
          </Link>
          <Link href="/past-covers">
            <div className={`h-full flex justify-center items-center pl-5 pr-5 text-black ${pathname === '/past-covers' ? 'bg-black text-white' : 'hover:bg-black hover:text-white transition-colors duration-300 ease-in-out'}`}>
              dance covers
            </div>
          </Link>
          <Link href="/meet-exec">
            <div className={`h-full flex justify-center items-center pl-5 pr-5 text-black ${pathname === '/meet-exec' ? 'bg-black text-white' : 'hover:bg-black hover:text-white transition-colors duration-300 ease-in-out'}`}>
              meet exec
            </div>
          </Link>
          <Link href="/merch">
            <div className={`h-full flex justify-center items-center pl-5 pr-5 text-black ${pathname === '/merch' ? 'bg-black text-white' : 'hover:bg-black hover:text-white transition-colors duration-300 ease-in-out'}`}>
              merch
            </div>
          </Link>
          <Link href="/join-us">
            <div className={`h-full flex justify-center items-center pl-5 pr-5 text-black ${pathname === '/join-us' ? 'bg-black text-white' : 'hover:bg-black hover:text-white transition-colors duration-300 ease-in-out'}`}>
              join us
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
