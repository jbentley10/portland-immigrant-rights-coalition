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
    <section className='mt-0 pt-16 component-container bg-primary relative w-full flex'>
      <div className='w-1/2'>
        <Image
          src='/hero-image.png'
          width={1201}
          height={1321}
          alt='A monotone red image of a man addressing a crowd'
        />
      </div>
      <div className='w-1/2 relative z-10 text-left'>
        <div className='mb-16'>
          <h1 className='text-white font-bold tracking-tight'>
            {props.heading}
          </h1>
          <p className='text-lg text-white'>{props.subheading}</p>
        </div>
        <Button size={`lg`} className='mr-6'>
          <Link href={props.buttonLink} prefetch={false}>
            {props.buttonText}
          </Link>
        </Button>
      </div>
    </section>
  );
}
