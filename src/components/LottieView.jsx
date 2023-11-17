import React from "react";
import Lottie, { useLottie } from "lottie-react";

const LottieView = ({ animationData }) => {

  const { View } = useLottie({
    animationData,
    loop: true,
    autoPlay: true
  })
  return <>{View}</>

  // return <Lottie animationData={animationData} loop={true} autoPlay={true}/>;
}

export default LottieView;