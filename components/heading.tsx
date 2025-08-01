import React from "react";

function Heading(props: { heading: string }) {
  return (
    <section className='h-auto md:h-auto mt-0 sm:pt-10 md:pt-11 lg:pt-14 xl:pt-16 atf-container bg-primary relative w-full flex'>
      <div className='w-full md:w-1/2 relative z-10 text-left'>
        <div className='mb-16 max-w-md'>
          <h1 className='pt-14 sm:pt-0 pb-7 text-white font-bold tracking-tight'>
            {props.heading}
          </h1>
        </div>
      </div>
    </section>
  );
}

export default Heading;
