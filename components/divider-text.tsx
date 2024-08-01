import React from "react";

function DividerText(props: { text: string }) {
  return (
    <div className='py-20'>
      <h3 className='text-primary text-center text-3xl'>{props.text}</h3>
    </div>
  );
}

export default DividerText;
