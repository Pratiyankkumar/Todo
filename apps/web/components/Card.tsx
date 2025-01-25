"use client";
import React from "react";
import { Meteors } from "@workspace/ui/components/meteors";

type props = {
  heading: string;
  para: string;
};

export const MeteorsDemo = ({ heading, para }: props) => {
  return (
    <div className="">
      <div className=" w-full relative max-w-xs">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
        <div className="relative shadow-xl bg-white dark:bg-gray-900 border dark:border-gray-800 border-gray-200 px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
          <h1 className="font-bold text-xl text-black dark:text-white mb-4 relative z-40">
            {heading}
          </h1>

          <p className="font-normal text-base text-slate-500 mb-4 relative z-40">
            {para}
          </p>

          <Meteors number={20} />
        </div>
      </div>
    </div>
  );
};
