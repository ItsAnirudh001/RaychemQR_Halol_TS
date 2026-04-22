"use client";

import React from "react";
import MuiTooltip from "../material-ui/tooltip";
import { BiRefresh } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";

export default function AdminPageHead(props: {
  title: string;
  setSearchVal: React.Dispatch<React.SetStateAction<string>>;
  searchVal: string;
  handleRefresh: () => Promise<void>;
}) {
  const { title, handleRefresh, setSearchVal, searchVal } = props;

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
            value={searchVal}
            placeholder="Search"
            type="search"
            className="border-none outline-none placeholder-gray-500 font-medium w-full"
          />
        </div>

        <MuiTooltip title="Refresh Page">
          <button
            className="animated rounded-3xl text-[3rem] text-[rgb(9,99,126)]"
            onClick={handleRefreshClick}
          >
            <BiRefresh />
          </button>
        </MuiTooltip>
      </div>
    </div>
  );
}
