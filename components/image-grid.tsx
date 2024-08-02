import Image from "next/image";
import React from "react";

export interface ContentfulImage {
  metadata: {};
  sys: {};
  fields: {
    title: string;
    description: string;
    file: {
      url: string;
      details: {
        size: number;
        image: {
          width: number;
          height: number;
        };
      };
      filename: string;
      contentType: string;
    };
  };
}

function ImageGrid(props: { images: Array<ContentfulImage> }) {
  let modifiedImages = [];

  for (let i = 0; i < props.images.length; i++) {
    let { title, file } = props.images[i].fields;

    modifiedImages.push({
      title: title,
      url: file.url,
      width: file.details.image.width,
      height: file.details.image.height,
    });
  }

  return (
    <div className='component-container component-spacer grid grid-cols-2'>
      <div className='grid grid-rows-2'>
        <div className='grid grid-cols-2'>
          <div className=''>
            <Image
              src={`https:${modifiedImages[0].url}`}
              width={modifiedImages[0].width}
              height={modifiedImages[0].height}
              alt={modifiedImages[0].title}
              loading={"lazy"}
            />
          </div>
          <div className=''>
            <Image
              src={`https:${modifiedImages[1].url}`}
              width={modifiedImages[1].width}
              height={modifiedImages[1].height}
              alt={modifiedImages[1].title}
              loading={"lazy"}
            />
          </div>
        </div>
        <div className='mt-4 grid grid-cols-2'>
          <div className=''>
            <Image
              src={`https:${modifiedImages[4].url}`}
              width={modifiedImages[4].width}
              height={modifiedImages[4].height}
              alt={modifiedImages[4].title}
              loading={"lazy"}
            />
          </div>
          <div className=''>
            <Image
              src={`https:${modifiedImages[3].url}`}
              width={modifiedImages[3].width}
              height={modifiedImages[3].height}
              alt={modifiedImages[3].title}
              loading={"lazy"}
            />
          </div>
        </div>
      </div>
      <div className=''>
        <Image
          src={`https:${modifiedImages[2].url}`}
          width={modifiedImages[2].width}
          height={modifiedImages[2].height}
          alt={modifiedImages[2].title}
          loading={"lazy"}
        />
      </div>
    </div>
  );
}

export default ImageGrid;
