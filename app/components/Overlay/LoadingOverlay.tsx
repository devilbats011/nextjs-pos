"use client";

import Lottie from "lottie-react";
import lottie_loading_1 from "./lottie_loading_1.json";
import useStore from "@/hooks/zustand/useStore";
import { useEffect } from "react";

export default function LoadingOverlay() {
  const { isLoading } = useStore((state) => state);

  useEffect(() => {
    console.log(isLoading, "isLoad!");
  }, [isLoading]);

  return (
    isLoading && (
      <div
        className="fixed  bg-white/90  inset-0 z-50 flex items-center justify-center backdrop-blur-sm top-0 left-0 w-screen h-screen"
        style={{ display: "fixed" }}
      >
          <div className="relative flex justify-center items-center" style={{ width: "30%", minWidth: '180px'  }}>
            <Lottie
              className="w-full"
              animationData={lottie_loading_1}
              loop={true}
            />
          </div>
      </div>
    )
  );
}
