import React from "react";

function DividerText(props: { text: string }) {
  return (
    <div className='pt-20 lg:py-20'>
      <h3 className='text-primary text-center text-3xl px-12 md:px-32 lg:px-48 xl:px-80'>
        {props.text}
      </h3>
    </div>
  );
}

export default DividerText;
