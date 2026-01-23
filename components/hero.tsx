/**
 * v0 by Vercel.
 * @see https://v0.dev/t/uZWnofwD6qr
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";

export default function Hero(props: {
  heading: string;
  subheading: string;
  buttonLink: string;
  buttonText: string;
}) {
  return (
    <section className='h-auto mt-0 sm:pt-10 lg:pt-14 xl:pt-16 lg:pb-10 atf-container bg-primary relative w-full flex'>
      <div className='hidden md:inline w-0 md:w-1/2'>
        <Image
          src='/rose-black.webp'
          className='w-3/4'
          width={800}
          height={920}
          alt='A monotone image of a rose, with a heart that says "We keep us safe"'
          loading='eager'
        />
      </div>
      <div className='w-full md:w-1/2 relative z-10 text-left pt-14 sm:pt-0'>
        <div className='mb-16'>
          <h1 className='pb-7 text-white font-bold tracking-tight'>
            {props.heading}
          </h1>
          <p className='text-lg text-white'>{props.subheading}</p>
        </div>
        {props.buttonLink && props.buttonText && (
          <Button size={`lg`} className='mr-6'>
            <Link href={props.buttonLink} prefetch={false}>
              {props.buttonText}
            </Link>
          </Button>
        )}
      </div>
    </section>
  );
}
