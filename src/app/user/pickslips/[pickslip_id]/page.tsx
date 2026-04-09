"use client";

import { apiErrorPrompter, GetPickslipItems } from "@/api/common-utils";
import { usermodroutes } from "@/api/user/user-routes";
import NoData from "@/components/no-data";
import UserAuthHeader from "@/components/user/authd-header";
import ItemDeletionModal from "@/components/user/modals/item-delete-modal";
import OrderSubmissionModal from "@/components/user/modals/order-submission-modal";
import useAppStore from "@/store/app-store";
import { PickslipItem } from "@/types/pickslip-type";
import { customAxios } from "@/utils/axios";
import {
  dynamicClass,
  isAPISuccess,
  searchParam,
  smallHeight,
} from "@/utils/helpers";
import {
  getStoredPickslip,
  getStoredScanSessionID,
} from "@/utils/session-utils";
import { toastify } from "@/utils/toast";
import { useRouter } from "next/navigation";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { FaRegClock } from "react-icons/fa";
import { FaHashtag, FaRegCircleCheck } from "react-icons/fa6";
import { IoChevronBackCircle } from "react-icons/io5";
import { LuQrCode } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbArrowsSort } from "react-icons/tb";

export default function PickslipItemsScreen() {
  const { back, push } = useRouter();
  const { loading, setLoading } = useAppStore();
  const pickslip = getStoredPickslip();

  const [sortKey, setSortKey] = useState<string>("");
  const [pickslipItems, setPickslipItems] = useState<PickslipItem[]>();
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [searchVal, setSearchVal] = useState<string>("");

  const [viewDelete, setViewDelete] = useState<boolean>(false);
  const [viewDashboard, setViewDashboard] = useState<boolean>(false);

  const [selectedItem, setSelectedItem] = useState<PickslipItem>();

  useLayoutEffect(() => {
    setLoading(true);
  }, []);

  const created = pickslip?.status === "created";
  const submitted = pickslip?.status === "submitted";

  const { oa_no, pickslip_id } = pickslip;

  const scannedItems = pickslipItems?.filter(
    (item: PickslipItem) => item.is_scanned == true,
  );

  async function fetchPickslipItems() {
    setLoading(true);
    const { pickslip_id } = pickslip;

    try {
      const items = await GetPickslipItems(pickslip_id, setLoading);

      if (!Array.isArray(items)) return;

      const sorted_items = items?.sort((a, b) => b.item_id - a.item_id);
      setPickslipItems(sorted_items);
    } catch (error) {
      console.error("Error in fetchPickslipItems", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPickslipItems();
  }, []);

  // console.log("items", pickslipItems);

  function sortedData() {
    if (!sortKey) return pickslipItems;

    const sorted_data = pickslipItems?.sort((a, b) =>
      sortKey === "desc" ? b.item_id - a.item_id : a.item_id - b.item_id,
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

  function searchedData() {
    const data = filteredData();

    if (!searchVal) return data;

    const searched = data?.filter(
      (d) =>
        searchParam(d.item_code).includes(searchParam(searchVal)) ||
        searchParam(d.material_description).includes(searchParam(searchVal)) ||
        searchParam(d.serial_no).includes(searchParam(searchVal)) ||
        searchParam(d.batch_no).includes(searchParam(searchVal)),
    );

    return searched;
  }

  const iconClass = "text-blue-600";

  function infoCard(label: string, value: string, icon: React.ReactNode) {
    return (
      <div className="flex flex-col bg-[rgba(242,247,252,1)] py-2 px-4 text-xs rounded-2xl gap-2 w-full">
        <div className="flex items-center gap-1">
          {icon}
          <span className="text-[rgba(98,116,142,1)] font-medium text-[2.65vw]">
            {label}
          </span>
        </div>
        <span className="tracking-wide text-[3vw]">{value}</span>
      </div>
    );
  }

  function showDelete(data: PickslipItem) {
    setSelectedItem(data);
    setViewDelete(true);
  }

  function hideDelete() {
    setViewDelete(false);
    setSelectedItem(undefined);
  }

  function showDashboard() {
    setViewDashboard(true);
  }

  function hideDashboard() {
    setViewDashboard(false);
  }

  function handleScanClick(data: PickslipItem) {
    sessionStorage.setItem("scan_item", JSON.stringify(data));
    push(`/user/pickslips/${pickslip_id}/scan/${data.item_id}`);
  }

  async function postSubmitPickslip() {
    setLoading(true);

    const params = {
      session_id: getStoredScanSessionID(),
    };

    // return console.log("params",JSON.stringify(params))

    try {
      const { data } = await customAxios.post(
        usermodroutes({ pickslip_id }).submitPickslipItems,
        null,
        {
          params,
        },
      );

      const { status, message } = data;
      const success = isAPISuccess(status);
      toastify(success ? "success" : "warning", message);

      if (!success) return;

      showDashboard();
    } catch (error) {
      console.error("Error in submit scan session", error);
      apiErrorPrompter(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleRefresh() {
    setSortKey("");
    setSearchVal("");
    setStatusFilter("");
    await fetchPickslipItems();
  }

  const headerProps = { setSearchVal, handleRefresh };

  const deleteModalProps = {
    viewDelete,
    hideDelete,
    item: selectedItem,
    fetchPickslipItems,
  };

  const submitModalProps = {
    viewDashboard,
    hideDashboard,
    scannedItems,
    pickslipItems,
  };

  const finalData = searchedData();
  const validData = Array.isArray(finalData) && finalData.length > 0;
  const allScanned = scannedItems?.length == pickslipItems?.length;

  // console.log("items", pickslipItems);

  if (loading) return <></>;

  return (
    <>
      {/* header */}
      <UserAuthHeader {...headerProps}>
        <div className="flex items-center gap-2 text-[rgba(64,108,175,1)]">
          <button className="animated2 text-3xl" onClick={back}>
            <IoChevronBackCircle />
          </button>

          <div className="flex flex-col font-medium">
            <span className="text-[rgba(144,161,185,1)] text-xs">Order ID</span>
            <textarea
              disabled
              className="text-[3.25vw] w-[24vw] field-sizing-content"
              value={oa_no || ""}
            />
          </div>
        </div>
      </UserAuthHeader>

      {/* body */}
      <div
        className={`flex flex-col p-[2vh] gap-[2vh] ${smallHeight() ? "mt-[10vh]" : "mt-[7.5vh]"} ${allScanned ? "mb-[15.5vh]" : "mb-[2.2vh]"}`}
      >
        {/* top buttons */}
        {pickslipItems && pickslipItems.length > 0 && (
          <div className="flex justify-between">
            <div className="flex h-[3.5vh] gap-[2.5vw] items-center">
              <button
                className={dynamicClass(Boolean(sortKey))}
                onClick={handleSort}
              >
                <span>Sort</span>
                <TbArrowsSort />
              </button>

              {created && (
                <>
                  <div className="h-[90%] w-0.5 bg-[rgba(171,181,194,1)]" />

                  <button
                    className={dynamicClass(statusFilter === "pending")}
                    onClick={() => setStatusFilter("pending")}
                  >
                    <FaRegClock />
                    <span>Pending</span>
                  </button>

                  <button
                    className={dynamicClass(statusFilter === "verified")}
                    onClick={() => setStatusFilter("verified")}
                  >
                    <FaRegCircleCheck />
                    <span>Verified</span>
                  </button>
                </>
              )}
            </div>

            {/* <TbReload className="text-3xl self-center" onClick={handleReset} /> */}
          </div>
        )}

        {validData ? (
          <>
            {/* order cards */}
            {finalData?.map((data, index) => (
              <div
                className={`flex flex-col bg-white w-full rounded-3xl border-2 overflow-hidden ${data.status === "pending" ? "border-gray-200" : "border-green-600"}`}
                key={data.item_id}
              >
                <div
                  className={`h-[0.85vh] w-full ${
                    data.status === "verified"
                      ? "bg-[linear-gradient(90deg,rgba(218,255,224,1)_10%,rgba(6,191,133,1))]"
                      : "bg-[linear-gradient(90deg,rgba(202,213,226,1)_10%,rgba(144,161,185,1))]"
                  } rounded-3xl`}
                />

                {/* order info */}
                <div className="flex flex-col p-[1.75vh] gap-[1.75vh]">
                  <div className="flex items-center justify-between w-full">
                    {/* order id */}
                    <div className="flex items-center gap-[1.75vw]">
                      <div className="flex bg-[rgba(215,231,255,1)] rounded-lg px-[1.15vw] py-[0.65vh] items-center text-[rgba(64,108,175,1)] gap-[0.75vw] text-[3.5vw]">
                        <span>#</span>
                        <span>{index + 1}</span>
                      </div>

                      <div className="flex flex-col font-medium">
                        <textarea
                          disabled
                          className="text-[3.25vw] w-[50vw] field-sizing-content max-h-fit"
                          value={data.material_description || ""}
                        />
                      </div>
                    </div>

                    {!submitted && (
                      <>
                        {data.status === "pending" && (
                          <button
                            className="animated2 flex bg-[linear-gradient(180deg,rgba(64,108,175,1)_10%,rgba(79,57,246,1))] place-items-center p-[0.75vh] rounded-lg shadow-2xl shadow-black"
                            onClick={() => handleScanClick(data)}
                          >
                            <LuQrCode className="text-white font-medium text-2xl" />
                          </button>
                        )}

                        {data.status === "verified" && (
                          <button
                            className="animated2 flex bg-[linear-gradient(90deg,rgba(250,92,92,1)_10%,rgba(188,0,0,1))] place-items-center p-[0.75vh] rounded-lg shadow-2xl shadow-black"
                            onClick={() => showDelete(data)}
                          >
                            <RiDeleteBin6Line className="text-white font-medium text-2xl" />
                          </button>
                        )}
                      </>
                    )}
                  </div>

                  <div className="flex w-full gap-[2.5vw]">
                    {infoCard(
                      "Item Code",
                      data.item_code,
                      <FaHashtag className={iconClass} />,
                    )}
                    {infoCard(
                      "Serial Number",
                      data.serial_no || "",
                      <FaHashtag className={iconClass} />,
                    )}
                  </div>

                  <div className="flex w-full gap-[2.5vw]">
                    {infoCard(
                      "Batch No.",
                      data.batch_no || "NA",
                      <FaHashtag className={iconClass} />,
                    )}
                    {infoCard(
                      "Weight",
                      data.weight || "",
                      <FaHashtag className={iconClass} />,
                    )}
                    {infoCard(
                      "Box Type",
                      data.box_type || "",
                      <FaHashtag className={iconClass} />,
                    )}
                  </div>
                </div>
              </div>
            ))}

            {allScanned && (
              <div className="fixed bottom-[1.5vh] left-0 right-0 p-[5vw] bg-[rgba(255,255,255,0.5)] text-white text-center space-y-[0.75vh]">
                <button
                  className="animated2 flex items-center justify-center gap-[2vw] mobile-btn-main bg-[rgba(6,140,95,1)]! font-normal! rounded-2xl! shadow-[4px_55px_24px_rgba(0,0,0,0.8)] text-[4.5vw]"
                  onClick={postSubmitPickslip}
                >
                  <FaRegCircleCheck className="text-[5.5vw]" />
                  Submit Order
                </button>

                <span className="text-[3.25vw]">{`Validated all items to submit (${scannedItems?.length}/${pickslipItems?.length} completed)`}</span>
              </div>
            )}
          </>
        ) : (
          <NoData />
        )}
      </div>

      <ItemDeletionModal {...deleteModalProps} />

      <OrderSubmissionModal {...submitModalProps} />
    </>
  );
}
