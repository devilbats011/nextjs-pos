
import Image from 'next/image';
import React from 'react';

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="border border-black rounded p-8 max-w-md w-full">
        <div className="flex flex-col items-center">
          <Image
            width={260}
            height={260}
            src="https://i.imgflip.com/58eyvu.png?a480816"
            alt="Ops Error"
            className="w-full mb-4"
          />

          <h1> Ops, Something went wrong, <a href="/" style={{ color: "blue" , textDecoration:"underline"}}> Go Home </a> </h1>
        </div>
      </div>
    </div>
  );
};

export default page;