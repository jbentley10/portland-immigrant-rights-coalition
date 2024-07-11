import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

export default function Footer() {
  return (
    <footer>
      <div className="bg-secondary--foreground flex flex-row pt-24 pb-24">
        <div className="w-1/2">
          <Image src="/logo.svg" width="500" height="315" alt="Company logo"/>
        </div>
        <div className="w-1/2 pt-16 flex flex-wrap flex-row">
          <div className="flex flex-col max-w-48 w-full">
            <h2 className="text-xl font-semibold mr-8 mb-6 border-b-2 border-border pb-4">Information</h2>
            <ul>
              <li>Link 1</li>
              <li>Link 2</li>
              <li>Link 3</li>
            </ul>
          </div>
          <div className="flex flex-col max-w-48 w-full">
            <h2 className="text-xl font-semibold mr-8 mb-6 border-b-2 border-border pb-4">Services</h2>
            <ul>
              <li>Service 1</li>
              <li>Service 2</li>
              <li>Service 3</li>
            </ul>
          </div>
          <div className="flex flex-col max-w-48 w-full">
            <h2 className="text-xl font-semibold mr-8 mb-6 border-b-2 border-border pb-4">Contact</h2>
            <ul>
              <li>{process.env.NEXT_PUBLIC_CLIENT_ADDRESS}</li>
              <li><Link href="tel:+15555555555">{process.env.NEXT_PUBLIC_CLIENT_PHONE}</Link></li>
              <li><Link href="mailto:email@me.com">{process.env.NEXT_PUBLIC_CLIENT_EMAIL}</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <p className="text-center pb-8">Designed and hand coded by <Link className="text-primary font-semibold" href="https://palmspringswebdesign.net">Palm Springs Web Design</Link> Copyright 2024 - Present</p>
    </footer>
  );
}
