"use client";

import UserAuthHeader from "@/components/user/authd-header";
import { FaCube, FaRegClock } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";
import { TbArrowsSort } from "react-icons/tb";
import React, { useState } from "react";
import { TbReload } from "react-icons/tb";
import { pickslipsDataMock } from "@/constants/user/mocks/picklips-mock";
import { useRouter } from "next/navigation";
import { Pickslip } from "@/types/pickslip-type";

export default function PickslipsScreen() {
  const { push } = useRouter();
  const [sortKey, setSortKey] = useState<string>("");
  const [pickslips, setPickslips] = useState<Pickslip[] | []>(pickslipsDataMock);
  const [statusFilter, setStatusFilter] = useState<string>("");

  const [searchVal, setSearchVal] = useState<string>("");

  function dynamicClass(condition: boolean, color: string) {
    console.log("condition", condition);
    console.log("color", color);

    return !condition
      ? `mobile-filter-btn text-[rgba(120,124,130,1)]`
      : "mobile-filter-btn border! border-green-700! text-green-700!";
  }

  function sortedData() {
    if (!sortKey) return pickslips;

    const sorted_data = [...pickslips].sort((a, b) =>
      sortKey === "desc"
        ? b.pickslip_id - a.pickslip_id
        : a.pickslip_id - b.pickslip_id,
    );

    return sorted_data;
  }

  function filteredData() {
    const data = sortedData();

    const filteredData = data.filter((slip) => slip.status === statusFilter);

    return statusFilter ? filteredData : data;
  }

  function handleReset() {
    window.location.reload();
  }

  function handleSort() {
    setSortKey((prev) => {
      return prev === "desc" ? "asc" : "desc";
    });
  }

  function searchParam(value: string) {
    return value.toLowerCase().trim();
  }

  function searchedData() {
    const data = filteredData();

    if (!searchVal) return data;

    const searched = data.filter((d) =>
      searchParam(d.oa_no).includes(searchParam(searchVal)),
    );

    return searched;
  }

  function directToItems(data: Pickslip) {
    const { pickslip_id } = data;
    sessionStorage.setItem("pickslip_details", JSON.stringify(data));
    push(`/user/pickslips/${pickslip_id}`);
  }

  const headerProps = { setSearchVal, searchable: true };

  return (
    <>
      {/* header */}
      <UserAuthHeader {...headerProps}>
        <>
          <FaCube color="blue" className="text-[1.4rem]" />
          <h1 className="font-semibold text-[0.85rem]">Pickslips</h1>
        </>
      </UserAuthHeader>

      {/* body */}
      <div className="flex flex-col px-4 py-5 gap-5 mt-[6.5vh]">
        {/* top buttons */}
        <div className="flex justify-between">
          <div className="flex h-[3.5vh] gap-4 items-center">
            <button
              className={
                !sortKey
                  ? "mobile-filter-btn text-[rgba(78,82,87,1)]"
                  : "mobile-filter-btn border! border-green-700! text-green-700!"
              }
              onClick={handleSort}
            >
              <span>Sort</span>
              <TbArrowsSort />
            </button>

            <div className="h-[90%] w-[0.5vw] bg-[rgba(171,181,194,1)]" />

            <button
              className={
                statusFilter === "created"
                  ? "mobile-filter-btn border! border-green-700! text-green-700!"
                  : `mobile-filter-btn text-[rgba(120,124,130,1)]`
              }
              onClick={() => setStatusFilter("created")}
            >
              <FaRegClock />
              <span>Pending</span>
            </button>

            <button
              className={
                statusFilter === "completed"
                  ? "mobile-filter-btn border! border-green-700! text-green-700!"
                  : `mobile-filter-btn text-[rgba(120,124,130,1)]`
              }
              onClick={() => setStatusFilter("completed")}
            >
              <FaRegCircleCheck />
              <span>Completed</span>
            </button>
          </div>

          {/* <TbReload className="text-3xl self-center" onClick={handleReset} /> */}
        </div>

        {/* order cards */}
        {searchedData().map((data) => (
          <div
            key={data.oa_no}
            className="flex flex-col bg-white w-full rounded-3xl border-2 border-gray-200 overflow-hidden shadowed"
          >
            <div
              className={`h-[1vh] w-full 
                ${
                  data.status === "completed"
                    ? "bg-[linear-gradient(90deg,rgba(248,209,168,1)_10%,rgba(255,169,94,1))]"
                    : "bg-[linear-gradient(90deg,rgba(202,213,226,1)_10%,rgba(144,161,185,1))]"
                } 
                  rounded-3xl`}
            />

            {/* order info */}
            <div className="flex flex-col p-4 gap-4">
              <div className="flex items-center justify-between w-full">
                {/* order id */}
                <div className="flex items-center gap-3">
                  <div className="flex bg-[linear-gradient(90deg,rgba(43,127,255,1)_10%,rgba(79,57,246,1))] rounded-md p-2 items-center">
                    <FaCube color="white" className="text-[0.85rem]" />
                  </div>

                  <div className="flex flex-col font-medium">
                    <span className="text-[rgba(144,161,185,1)] text-[0.75rem]">
                      Order ID
                    </span>
                    <textarea
                      disabled
                      className="text-[0.85rem] w-[27vw] field-sizing-content"
                      value={data.oa_no}
                    />
                  </div>
                </div>

                {/* scanned */}
                <div className="flex flex-col bg-[rgba(242,247,252,1)] place-items-center p-2 font-medium text-[0.75rem] rounded-2xl gap-2">
                  <span className="text-[rgba(98,116,142,1)]">
                    Scanned items
                  </span>
                  <span className="tracking-wide">{`${data.scanned}/${data.total}`}</span>
                </div>
              </div>

              {data.status === "created" && (
                <button
                  className="mobile-btn-main py-2.5! font-medium! text-[0.85rem]!"
                  onClick={() => directToItems(data)}
                >
                  Start Scanning
                </button>
              )}

              {data.status === "completed" && (
                <div className="flex w-full justify-between gap-[4vw]">
                  <button
                    className="mobile-btn-main py-2.5! font-medium! text-[0.85rem]!"
                    onClick={() => directToItems(data)}
                  >
                    View Items
                  </button>

                  <button className="mobile-btn-main py-2.5! font-medium! text-[0.85rem]! text-[rgba(64,108,175,1)]! border border-[rgba(64,108,175,1)] bg-transparent! w-full rounded-xl">
                    Download
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
