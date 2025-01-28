"use client";

import { CheckCircle2, CircleX } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Props = {
  text: string;
  isError: boolean;
  hidden: boolean;
};

export default function Alert03({ text, isError, hidden }: Props) {
  const [hide, setHide] = useState<boolean>(hidden);

  useEffect(() => {
    setTimeout(() => {
      setHide(true);
    }, 5000);
  });
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`w-full max-w-sm mx-auto fixed md:right-10 ${hide ? "hidden" : ""}  top-4`}
    >
      <div
        className={`relative overflow-hidden rounded-lg border border-emerald-200/30 ${isError ? "bg-red-400/50 dark:bg-red-900/20" : "bg-emerald-50/50 dark:bg-emerald-950/20"}  dark:border-emerald-800/30 p-4 shadow-sm`}
      >
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
          >
            <div
              className={`rounded-full ${isError ? "bg-red-100 dark:bg-red-900/50" : "bg-emerald-100 dark:bg-emerald-900/50"} p-1`}
            >
              {!isError ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <CircleX className="h-4 w-4 text-red-600 dark:text-red-400" />
              )}
            </div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className={`text-sm font-medium ${!isError ? "text-emerald-800 dark:text-emerald-200" : "text-red-800 dark:text-red-200"} `}
          >
            {text}
          </motion.p>
        </div>

        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />
      </div>
    </motion.div>
  );
}
