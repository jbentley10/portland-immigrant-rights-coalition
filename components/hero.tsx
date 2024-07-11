/**
 * v0 by Vercel.
 * @see https://v0.dev/t/uZWnofwD6qr
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { Button } from "./ui/button";

export default function Hero(props: {
  heading: string;
  subheading: string;
  buttonLink: string;
  buttonText: string;
}) {
  return (
    <section
      className="bg-background relative w-full flex items-center justify-center"
    >
      <div className="relative z-10 text-center space-y-4 px-4 md:px-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          {props.heading}
        </h1>
        <p className="text-lg md:text-xl max-w-4xl">{props.subheading}</p>
        <Button className="mr-6">
          <Link href={props.buttonLink} prefetch={false}>
            {props.buttonText}
          </Link>
        </Button>
        <Button>
          <Link href={props.buttonLink} prefetch={false}>
            {props.buttonText}
          </Link>
        </Button>
      </div>
    </section>
  );
}
