"use client";

import React from "react";
import MuiTooltip from "../material-ui/tooltip";
import { IoRefreshCircleSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";

export default function AdminPageHead(props: {
  title: string;
  setSearchVal: React.Dispatch<React.SetStateAction<string>>;
  handleRefresh: () => Promise<void>;
}) {
  const { title, handleRefresh, setSearchVal } = props;

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    if (!setSearchVal) return;

    const { value } = e.target;
    setSearchVal(value);
  }

  async function handleRefreshClick() {
    setSearchVal("");
    await handleRefresh();
  }

  return (
    <div className="flex w-full items-center justify-between">
      <h1 className="font-semibold line-clamp-none text-primary-heading">
        {title}
      </h1>

      <div className="flex gap-[1vw]">
        <div className="flex bg-white rounded-3xl py-2 px-4 placeholder:text-gray-600 gap-2 items-center border border-gray-300 text-[0.85rem]! w-[17vw]">
          <FaSearch />
          <input
            onChange={handleSearch}
            placeholder="Search"
            type="search"
            className="border-none outline-none placeholder-gray-500 font-medium w-full"
          />
        </div>

        <MuiTooltip title="Refresh Page">
          <button
            className="animated hover-shadow rounded-3xl text-[3rem] text-[rgb(9,99,126)]"
            onClick={handleRefreshClick}
          >
            <IoRefreshCircleSharp />
          </button>
        </MuiTooltip>
      </div>
    </div>
  );
}
