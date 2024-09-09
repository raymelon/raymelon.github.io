"use client";

import Script from "next/script";

const TinyBird = () => {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://unpkg.com/@tinybirdco/flock.js"
        data-host="https://api.us-west-2.aws.tinybird.co"
        data-token={`${process.env.NEXT_PUBLIC_TINYBIRD_DATA_TOKEN}`}
      />     
    </>
  );
};

export default TinyBird;