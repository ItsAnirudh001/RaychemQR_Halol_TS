"use client";

import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function LottieView(props: { animation: object }) {
  const { animation } = props;

  return (
    <Lottie animationData={animation} autoplay loop className="w-[80%] lg:w-[40%] h-full self-center" />
  );
}
