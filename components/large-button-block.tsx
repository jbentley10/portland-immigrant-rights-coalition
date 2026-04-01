import React from "react";
import Link from "next/link";

function LargeButtonBlock(props: {
  buttonText: string;
  buttonLink: string;
}) {
  return (
    <div className="text-center my-8 flex flex-col items-center">
      <Link href={props.buttonLink}>
        <button className="uppercase inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors bg-[#FF6B35] hover:bg-[#FF5722] text-white h-11 px-20 sm:px-16 lg:px-20 xl:px-24 py-10 sm:py-8 lg:py-10 xl:py-12 text-4xl sm:text-3xl lg:text-4xl xl:text-5xl rounded-sm shadow-lg hover:shadow-xl">
          {props.buttonText}
        </button>
      </Link>
    </div>
  );
}

export default LargeButtonBlock;
