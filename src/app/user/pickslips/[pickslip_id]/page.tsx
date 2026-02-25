"use client";

import UserAuthHeader from "@/components/user/authd-header";
import { FaCube, FaRegClock } from "react-icons/fa";
import { FaRegCircleCheck, FaHashtag } from "react-icons/fa6";
import { TbArrowsSort } from "react-icons/tb";
import React, { useState } from "react";
import { TbReload } from "react-icons/tb";
import dayjs from "dayjs";
import { IoChevronBackCircle } from "react-icons/io5";
import { useParams, useRouter } from "next/navigation";
import { RiErrorWarningLine, RiDeleteBin6Line } from "react-icons/ri";
import { LuQrCode } from "react-icons/lu";
import { pickslipsDataMock } from "@/constants/user/mocks/picklips-mock";
import AppModal from "@/components/material-ui/modal";
import ItemDeletionModal from "@/components/user/modals/item-delete-modal";
import OrderSubmissionModal from "@/components/user/modals/order-submission-modal";
import { PickslipItem } from "@/types/pickslip-type";

export default function PickslipItemsScreen() {
  const { pickslip_id } = useParams();
  const { back, push } = useRouter();
  const slipDetails = JSON.parse(sessionStorage.getItem("pickslip_details")!);

  const mockItems = pickslipsDataMock.find(
    (data) => data.pickslip_id == Number(pickslip_id),
  );

  const [sortKey, setSortKey] = useState<string>("");
  const [pickslipItems, setPickslipItems] = useState<
    PickslipItem[] | [] | undefined
  >(mockItems?.items);
  const [statusFilter, setstatusFilter] = useState<string>("");
  const [searchVal, setSearchVal] = useState<string>("");

  const [viewDelete, setViewDelete] = useState<boolean>(false);
  const [viewScan, setViewScan] = useState<boolean>(false);
  const [viewDashboard, setViewDashboard] = useState<boolean>(false);

  const [selectedItem, setSelectedItem] = useState<PickslipItem>();

  // console.log("items", pickslipItems);

  function dynamicClass(condition: boolean) {
    // console.log("condition", condition);
    // console.log("color", color);

    return !condition
      ? `mobile-filter-btn text-[rgba(120,124,130,1)]`
      : "mobile-filter-btn border! border-green-700! text-green-700!";
  }

  function sortedData() {
    if (!sortKey) return pickslipItems;

    const sorted_data = pickslipItems?.sort(
      (a, b) =>
        dayjs(sortKey === "desc" ? b.item_id : a.item_id).valueOf() -
        dayjs(sortKey === "desc" ? a.item_id : b.item_id).valueOf(),
    );

    return sorted_data;
  }

  function filteredData() {
    const data = sortedData();

    const filteredData = data?.filter((slip) => slip.status === statusFilter);

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

  function searchParam(value: string | null) {
    return String(value).toLowerCase().trim();
  }

  function searchedData() {
    const data = filteredData();

    if (!searchVal) return data;

    const searched = data?.filter(
      (d) =>
        searchParam(d.item_code).includes(searchParam(searchVal)) ||
        searchParam(d.material_description).includes(searchParam(searchVal)),
    );

    return searched;
  }

  const headerProps = { setSearchVal, searchable: true };

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

  function handleSubmitOrder() {
    setViewDashboard(true);
  }

  const deleteModalProps = { viewDelete, hideDelete, item: selectedItem };

  const submitModalProps = { viewDashboard, hideDashboard, item: selectedItem };

  return (
    <>
      {/* header */}
      <UserAuthHeader {...headerProps}>
        <div className="flex items-center gap-2 text-[rgba(64,108,175,1)]">
          <IoChevronBackCircle className="text-3xl" onClick={back} />

          <div className="flex flex-col font-medium">
            <span className="text-[rgba(144,161,185,1)] text-xs">Order ID</span>
            <textarea
              disabled
              className="text-[3.25vw] w-[24vw] field-sizing-content"
              value={slipDetails?.oa_no}
            />
          </div>
        </div>
      </UserAuthHeader>

      {/* body */}
      <div className="flex flex-col p-[2vh] gap-[2vh] mt-[6.5vh] mb-[15.5vh]">
        {/* top buttons */}
        <div className="flex justify-between">
          <div className="flex h-[3.5vh] gap-[2.5vw] items-center">
            {/* <button
              className={dynamicClass(Boolean(sortKey), "rgba(78,82,87,1)")}
              onClick={handleSort}
            >
              <span>Sort</span>
              <TbArrowsSort />
            </button>

            <div className="h-[90%] w-0.5 bg-[rgba(171,181,194,1)]" /> */}

            <button
              className={dynamicClass(
                statusFilter === "pending",
                "rgba(78,82,87,1)",
              )}
              onClick={() => setstatusFilter("pending")}
            >
              <FaRegClock />
              <span>Pending</span>
            </button>

            <button
              className={dynamicClass(
                statusFilter === "verified",
                "rgba(120,124,130,1)",
              )}
              onClick={() => setstatusFilter("verified")}
            >
              <FaRegCircleCheck />
              <span>Verified</span>
            </button>

            {/* <button
              className={dynamicClass(
                statusFilter === "aborted",
                "rgba(120,124,130,1)",
              )}
              onClick={() => setstatusFilter("completed")}
            >
              <RiErrorWarningLine className="text-sm" />
              <span>Aborted</span>
            </button> */}
          </div>

          {/* <TbReload className="text-3xl self-center" onClick={handleReset} /> */}
        </div>

        {/* order cards */}
        {searchedData()?.map((data, index) => (
          <div
            className={`flex flex-col bg-white w-full rounded-3xl border-2 overflow-hidden ${data.status === "completed" ? "border-green-600" : "border-gray-200"}`}
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
                      value={data.item_name}
                    />
                  </div>
                </div>

                {data.status === "pending" && (
                  <button
                    className="flex bg-[linear-gradient(180deg,rgba(64,108,175,1)_10%,rgba(79,57,246,1))] place-items-center p-[0.75vh] rounded-lg shadow-2xl shadow-black"
                    onClick={() => push(`/user/pickslips/${slipDetails.pickslip_id}/scan`)}
                  >
                    <LuQrCode className="text-white font-medium text-2xl" />
                  </button>
                )}

                {data.status === "verified" && (
                  <button
                    className="flex bg-[linear-gradient(90deg,rgba(250,92,92,1)_10%,rgba(188,0,0,1))] place-items-center p-[0.75vh] rounded-lg shadow-2xl shadow-black"
                    onClick={() => showDelete(data)}
                  >
                    <RiDeleteBin6Line className="text-white font-medium text-2xl" />
                  </button>
                )}
              </div>

              <div className="flex w-full gap-[2.5vw]">
                {infoCard("PCN", "NA", <FaHashtag className={iconClass} />)}
                {infoCard(
                  "Serial Number",
                  data.serial_no,
                  <FaHashtag className={iconClass} />,
                )}
              </div>

              <div className="flex w-full gap-[2.5vw]">
                {infoCard(
                  "Batch No.",
                  "NA",
                  <FaHashtag className={iconClass} />,
                )}
                {infoCard(
                  "Weight",
                  data.weight,
                  <FaHashtag className={iconClass} />,
                )}
                {infoCard(
                  "Box Type",
                  data.box_type,
                  <FaHashtag className={iconClass} />,
                )}
              </div>
            </div>
          </div>
        ))}

        <div className="fixed bottom-[1.5vh] left-0 right-0 p-[5vw] bg-[rgba(255,255,255,0.5)] text-white text-center space-y-[0.75vh]">
          <button
            className="flex items-center justify-center gap-[2vw] mobile-btn-main bg-[rgba(6,140,95,1)]! font-normal! rounded-2xl! shadow-[4px_55px_24px_rgba(0,0,0,0.8)] text-[4.5vw]"
            onClick={showDashboard}
          >
            <FaRegCircleCheck className="text-[5.5vw]" />
            Submit Order
          </button>

          <span className="text-[3.25vw]">{`Validated all items to submit (5/5 completed)`}</span>
        </div>
      </div>

      <ItemDeletionModal {...deleteModalProps} />

      <OrderSubmissionModal {...submitModalProps} />
    </>
  );
}
