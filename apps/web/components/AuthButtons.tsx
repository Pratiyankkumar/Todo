"use client";
import React from "react";
import { Button } from "@workspace/ui/components/button";
import Link from "next/link";

const ProjectButtons = () => {
  return (
    <div className="flex space-x-4 mt-8 justify-center">
      <Link href={"/login"}>
        <Button
          variant="default"
          className="px-8 py-3 bg-emerald-400 rounded-md"
        >
          Login
        </Button>
      </Link>
      <Link href={"/signup"}>
        <Button variant="secondary" className="px-8 py-3 rounded-md">
          SignUp
        </Button>
      </Link>
    </div>
  );
};

export default ProjectButtons;
