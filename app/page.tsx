import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

// root page ( "https://localhost:3000/" ) is empty; redirects to about-us, which we will use as the landing page

export default function Home() {
  redirect('/about-us');
  return (
    <main>
    </main>
  );
}
