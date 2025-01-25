"use client";
import React, { useEffect, useState } from "react";
import { ContainerScroll } from "@workspace/ui/components/scroll-animation";
import Image from "next/image";
import { useTheme } from "next-themes";

export function HeroScrollDemo() {
  const { theme } = useTheme();
  const [imageUrl, setImageUrl] = useState("/images/light.png");

  useEffect(() => {
    setImageUrl(theme === "dark" ? "/images/dark.png" : "/images/light.png");
  }, [theme]);

  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-emerald-500">
              Unleash the power of <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Productivity
              </span>
            </h1>
          </>
        }
      >
        <Image
          src={imageUrl}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
