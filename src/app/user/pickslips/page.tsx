"use client";

import UserAuthHeader from "@/components/user/authd-header";
import { FaCube, FaRegClock } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";
import { TbArrowsSort } from "react-icons/tb";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { pickslipsDataMock } from "@/constants/user/mocks/picklips-mock";
import { useRouter } from "next/navigation";
import { Pickslip } from "@/types/pickslip-type";
import useAppStore from "@/store/app-store";
import {
  apiErrorPrompter,
  GetAllPickslips,
  GetFileForDownload,
} from "@/api/common-utils";
import NoData from "@/components/no-data";
import { customAxios } from "@/utils/axios";
import { useroutes } from "@/api/user/user-routes";
import {
  dynamicClass,
  getScannedItems,
  isAPISuccess,
  smallHeight,
} from "@/utils/helpers";
import { toastify } from "@/utils/toast";

export default function PickslipsScreen() {
  const { push } = useRouter();
  const { setLoading } = useAppStore();

  const [sortKey, setSortKey] = useState<string>("");
  const [pickslips, setPickslips] = useState<Pickslip[]>();
  const [statusFilter, setStatusFilter] = useState<string>("");

  const [searchVal, setSearchVal] = useState<string>("");

  useLayoutEffect(() => {
    setLoading(true);
  }, []);

  const validData = Array.isArray(pickslips) && pickslips.length > 1;

  async function fetchPickslips() {
    setLoading(true);
    try {
      const data = await GetAllPickslips(setLoading);
      setPickslips(data);
    } catch (error) {
      console.error("Error fetching pickslips", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPickslips();
  }, []);

  function sortedData() {
    if (!sortKey) return pickslips;

    const sorted_data = pickslips?.sort((a, b) =>
      sortKey === "desc"
        ? b.pickslip_id - a.pickslip_id
        : a.pickslip_id - b.pickslip_id,
    );

    return sorted_data;
  }

  function filteredData() {
    const data = sortedData();

    const filteredData = data?.filter((slip) => slip.status === statusFilter);

    return statusFilter ? filteredData : data;
  }

  function handleSort() {
    setSortKey((prev) => {
      return prev === "asc" ? "desc" : "asc";
    });
  }

  function searchParam(value: string) {
    return value.toLowerCase().trim();
  }

  function searchedData() {
    const data = filteredData();

    if (!searchVal) return data;

    const searched = data?.filter((d) =>
      searchParam(d.oa_no).includes(searchParam(searchVal)),
    );

    return searched;
  }

  function handleViewItems(data: Pickslip) {
    sessionStorage.setItem("pickslip", JSON.stringify(data));
    setTimeout(() => {
      push(`/user/pickslips/${data.pickslip_id}`);
    }, 400);
  }

  async function postStartScan(pickslip: Pickslip) {
    const { pickslip_id } = pickslip;

    setLoading(true);

    try {
      const { data } = await customAxios.post(useroutes.startScanSession, {
        pickslip_id,
        device_id: "",
      });

      const { status, session_id, message } = data;
      const success = isAPISuccess(status);
      toastify(success ? "success" : "warning", message);

      if (!success) return;

      console.log("received session_id", session_id);

      sessionStorage.setItem("scan_session_id", String(session_id));
      handleViewItems(pickslip);
    } catch (error) {
      console.error("Error in startScanSession", error);
      apiErrorPrompter(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDownloadReport(pickslip: Pickslip) {
    try {
      await GetFileForDownload(pickslip, setLoading);
    } catch (error) {
      console.error("Error in downloadFile for user", error);
    }
  }

  async function handleRefresh() {
    setSortKey("");
    setSearchVal("");
    setStatusFilter("");
    await fetchPickslips();
  }

  const headerProps = { setSearchVal, handleRefresh };

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
      <div
        className={`flex flex-col px-4 py-5 gap-5 ${smallHeight() ? "mt-[10vh]" : "mt-[6.5vh]"}`}
      >
        {validData ? (
          <>
            {/* top buttons */}
            <div className="flex justify-between">
              <div className="flex h-[3.5vh] gap-[2.2vw] items-center">
                <button className={dynamicClass(sortKey)} onClick={handleSort}>
                  <span>Sort</span>
                  <TbArrowsSort />
                </button>

                <div className="h-[90%] w-[0.5vw] bg-[rgba(171,181,194,1)]" />

                <button
                  className={dynamicClass(statusFilter === "created")}
                  onClick={() => setStatusFilter("created")}
                >
                  {/* <FaRegClock /> */}
                  <span>Pending</span>
                </button>

                <button
                  className={dynamicClass(statusFilter === "completed")}
                  onClick={() => setStatusFilter("completed")}
                >
                  {/* <FaRegCircleCheck /> */}
                  <span>Completed</span>
                </button>

                <button
                  className={dynamicClass(statusFilter === "submitted")}
                  onClick={() => setStatusFilter("submitted")}
                >
                  {/* <FaRegCircleCheck /> */}
                  <span>Submitted</span>
                </button>
              </div>

              {/* <TbReload className="text-3xl self-center" onClick={handleReset} /> */}
            </div>

            {/* order cards */}
            {searchedData()?.map((data) => (
              <div
                key={data.oa_no}
                className="flex flex-col bg-white w-full rounded-3xl border-2 border-gray-200 overflow-hidden shadowed"
              >
                <div
                  className={`h-[1vh] w-full 
                ${
                  data.status === "submitted"
                    ? "bg-[linear-gradient(90deg,rgb(249,248,246,1)_10%,rgb(251,243,209,1))]"
                    : data.status === "completed"
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
                          value={data.oa_no || ""}
                        />
                      </div>
                    </div>

                    {/* scanned */}
                    <div className="flex flex-col bg-[rgba(242,247,252,1)] place-items-center p-2 font-medium text-[0.75rem] rounded-2xl gap-2">
                      <span className="text-[rgba(98,116,142,1)]">
                        Scanned items
                      </span>
                      <span className="tracking-wide">{`${getScannedItems(data.items).length}/${data.items?.length}`}</span>
                    </div>
                  </div>

                  {data.status === "created" && (
                    <button
                      className="animated2 mobile-btn-main py-2.5! font-medium! text-[0.85rem]!"
                      onClick={() => postStartScan(data)}
                    >
                      Start Scanning
                    </button>
                  )}

                  {data.status === "completed" && (
                    <button
                      className="animated2 mobile-btn-main py-2.5! font-medium! text-[0.85rem]!"
                      onClick={() => handleViewItems(data)}
                    >
                      View Items
                    </button>
                  )}

                  {data.status === "submitted" && (
                    <div className="flex w-full justify-between gap-[4vw]">
                      <button
                        className="animated2 mobile-btn-main py-2.5! font-medium! text-[0.85rem]!"
                        onClick={() => handleViewItems(data)}
                      >
                        View Items
                      </button>

                      <button
                        className="animated2 mobile-btn-main py-2.5! font-medium! text-[0.85rem]! text-[rgba(64,108,175,1)]! border border-[rgba(64,108,175,1)] bg-transparent! w-full rounded-xl"
                        onClick={() => handleDownloadReport(data)}
                      >
                        Download
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </>
        ) : (
          <NoData />
        )}
      </div>
    </>
  );
}
