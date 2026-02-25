import AppModal from "@/components/material-ui/modal";
import { PickslipItem } from "@/types/pickslip-type";
import React from "react";
import { FaCube } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

export default function OrderSubmissionModal(props: {
  viewDashboard: boolean;
  hideDashboard: () => void;
  item: PickslipItem | undefined;
}) {
  const { viewDashboard, hideDashboard, item } = props;

  return (
    <AppModal open={viewDashboard} onClose={hideDashboard}>
      <div className="flex flex-col w-full">
        <div className="flex flex-col bg-blue-600 rounded-t-2xl place-items-center text-center p-[3vh] text-white gap-[1.75vh]">
          <button
            className="bg-[rgba(241,245,249,1)] p-[0.75vh] rounded-4xl self-end!"
            onClick={hideDashboard}
          >
            <IoMdClose className="text-[rgba(69,85,108,1)]! text-[3vh]"  />
          </button>

          <div className="bg-white p-5 w-fit rounded-[40vw]">
            <FaRegCircleCheck className="text-[rgba(0,188,125,1)]! text-[7vh]" />
          </div>

          <h1 className="font-semibold text-[2vh]">Order Submitted!</h1>

          <h3 className="text-[1.75vh]">Your pickslip has been processed successfully</h3>
        </div>

        <div className="flex flex-col bg-white rounded-b-2xl place-items-center text-center px-[4vw] py-[3vh] gap-[2.5vh]">
          <div className="flex w-full gap-[5vw]">
            <div className="flex flex-col flex-1 bg-[linear-gradient(135deg,rgba(239,246,255,1)_10%,rgba(219,234,254,1)_90%)] py-[1vh] rounded-2xl items-center justify-center gap-[1.5vh] bg-[(219,234,254,1)]">
              <div className="bg-[rgba(43,127,255,1)] p-3 w-fit rounded-4xl">
                <FaCube className="text-white text-[2.2vh]" />
              </div>

              <span className="text-[1.75vh]">Items</span>

              <span className="text-[rgba(20,71,230,1)] text-[2vh] font-medium">
                5
              </span>
            </div>

            <div className="flex flex-1 flex-col bg-[linear-gradient(180deg,rgba(236,253,245,1)_10%,rgba(208,250,229,1)_100%)] py-[1vh] rounded-2xl items-center justify-center gap-[1.5vh]">
              <div className="bg-[rgba(0,188,125,1)] p-3 w-fit rounded-4xl">
                <FaRegCircleCheck className="text-white text-[2.2vh]" />
              </div>

              <span className="text-[1.75vh]">Validated</span>

              <span className="text-[rgba(0,122,85,1)] text-[2vh] font-medium">{`100%`}</span>
            </div>
          </div>

          <button className="mobile-btn-main text-[rgba(64,108,175,1)]! border border-[rgba(64,108,175,1)] bg-transparent! w-full rounded-xl">
            Download as PDF
          </button>

          <button className="mobile-btn-main bg-[linear-gradient(90deg,rgba(64,108,175,1)_20%,rgba(79,57,246,1)_100%)]!">
            Back to Dashboard
          </button>
        </div>
      </div>
    </AppModal>
  );
}
