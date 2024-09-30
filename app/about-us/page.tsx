'use client'
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect} from 'react';
import FrontPageHeader from "./components/FrontPageHeader";

export default function Home() {

  return (
    <main className="flex justify-center w-screen h-[200vh] max-w-screen">
      <FrontPageHeader/>
    </main>
  );
}