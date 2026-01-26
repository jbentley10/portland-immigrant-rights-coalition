import Image from "next/image";
import Link from "next/link";
import { Links } from "./ui/links";
import { Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className={
        "footer component-container bg-primary text-primary-foreground"
      }
    >
      <div className={"flex flex-col sm:flex-row"}>
        <div
          className={
            "pl-4 sm:pl-0 sm:w-1/2 pt-8 md:pt-14 pb-2 md:pb-10"
          }
        >
          <Image
            src="/logo.svg"
            width="200"
            height="195"
            alt="The logo for PIRC"
          />
        </div>
        <div className={`sm:w-1/2 pt-14`}>
          <div className={"flex flex-col lg:flex-row"}>
            <div
              className={
                "links sm:border-r-2 border-white py-8 md:py-4 pl-4 sm:pl-0 sm:pr-4 md:pr-20"
              }
            >
              <Links
                orientation="vertical"
                size={"large"}
                showChildPages={false}
              />
            </div>

            <div className={"information sm:pl-4 pl-4 lg:pl-16"}>
              <strong className="serif">Contact Us</strong>
              <br />
              <ul className="ml-4">
                <li>
                  <p>
                    General Email:{" "}
                    <Link href="mailto:pircpdx@gmail.com">pircpdx@gmail.com</Link>
                  </p>
                </li>
                <li>
                  <p>Volunteer Inquiries:{" "}
                    <Link href="mailto:volunteers@pircoregon.org">
                      admin@pircoregon.org
                    </Link></p>
                </li>
                <li>
                  <p>Press Inquiries:{" "}
                    <Link href="mailto:press@pircoregon.org">
                      press@pircoregon.org
                    </Link></p>
                </li>
              </ul>
              <br />
              <p>
                Non-emergency voicemail line:{" "}
                <Link href="tel:971-940-9053">971-940-9053</Link>
              </p>
              <br />
              <div className="flex row space-x-4">
                <Link target="_blank" href="https://instagram.com/pirc_oregon">
                  <Instagram />
                </Link>
                <Link
                  target="_blank"
                  href="https://facebook.com/pdximmigrantrights"
                >
                  <Facebook />
                </Link>
              </div>
              <br />
            </div>
            <div className={"flex flex-col sm:flex-row"}>
              <div className={"information sm:pl-4 pl-4 lg:pl-16"}>
                <p>PO Box 13434</p>
                <p>Portland, OR</p>
                <p>97213-0434</p>
                <p>United States</p>
                <br />
                <p>PIRC Tax ID 83-3179589</p>
                <br />
                <Link href="/privacy-policy">
                  <strong>Privacy Policy</strong>
                </Link>
                <br />
                <Link href="/terms-of-service">
                  <strong>Terms of Service</strong>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className={"text-center mt-12 pb-10"}>
        &copy;{`${new Date().getFullYear()}`}{" "}
        <Link
          className={"font-bold"}
          href="https://palmspringswebdesign.net"
          target="_blank"
        >
          Palm Springs Web Design
        </Link>
      </p>
    </footer >
  );
}
