"use client";

import React from "react";
import MuiTooltip from "../material-ui/tooltip";
import { IoRefreshCircleSharp } from "react-icons/io5";

export default function AdminPageHead(props: {
  title: string;
  handleRefresh: () => Promise<void>;
}) {
  const { title, handleRefresh } = props;

  return (
    <div className="flex w-full items-center justify-between">
      <h1 className="font-semibold line-clamp-none text-primary-heading">{title}</h1>

      <MuiTooltip title="Refresh Page">
        <button
          className="animated hover-shadow rounded-3xl text-[3rem] text-[rgb(9,99,126)]"
          onClick={handleRefresh}
        >
          <IoRefreshCircleSharp />
        </button>
      </MuiTooltip>
    </div>
  );
}
