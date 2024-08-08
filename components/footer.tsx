import Image from "next/image";
import Link from "next/link";
import { Links } from "./navigation";

export default function Footer() {
  return (
    <footer
      className={"component-container bg-primary text-primary-foreground"}
    >
      <div className={"flex flex-row "}>
        <div className={"w-1/2 pt-14 pb-10"}>
          <Image
            src='/logo.svg'
            width='200'
            height='195'
            alt='The logo for PIRC'
          />
        </div>
        <div className={`w-1/2 pt-14`}>
          <div className={"flex flex-row"}>
            <div className={"links border-r-2 border-white pr-20"}>
              <Links orientation='vertical' size={"large"} />
            </div>

            <div className={"information pl-16"}>
              <p>Privacy Policy</p>
            </div>
          </div>
        </div>
      </div>
      <p className={"text-center mt-12 pb-10"}>
        Copyright 2024{" "}
        <Link
          className={"text-accent"}
          href='https://palmspringswebdesign.net'
          target='_blank'
        >
          Palm Springs Web Design
        </Link>
      </p>
    </footer>
  );
}
