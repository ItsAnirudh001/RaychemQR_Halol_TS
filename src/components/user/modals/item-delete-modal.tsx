import AppModal from "@/components/material-ui/modal";
import { PickslipItem } from "@/types/pickslip-type";
import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function ItemDeletionModal(props: {
  viewDelete: boolean;
  hideDelete: () => void;
  item: PickslipItem  | undefined;
}) {
  const { viewDelete, hideDelete, item } = props;

  return (
    <AppModal open={viewDelete} onClose={hideDelete}>
      <div className="flex flex-col bg-[rgba(242,247,252,1)] rounded-2xl gap-[6vh] w-full p-[2.5vh]">
        <div className="flex flex-col gap-[1.5vh]">
          <h1 className="font-medium text-[1.75vh]">{`Confirmation to delete item :`}</h1>

          <span className="font-bold text-[2vh]">{item?.item_name}</span>
        </div>

        <div className="flex w-full justify-between gap-[6vw]">
          <button
            className="mobile-btn-main py-[1.5vh]! font-medium! text-[0.85vh] text-[rgba(91,92,93,1)]! border border-[rgba(91,92,93,1)] bg-transparent! w-full rounded-xl"
            onClick={hideDelete}
          >
            Cancel
          </button>

          <button className="mobile-btn-main flex items-center justify-center py-[1.5vh]! font-medium! text-[0.85vh] gap-[2vw] bg-[rgba(175,64,64,1)]!">
            <RiDeleteBin6Line className="text-white font-medium text-[3vh]" />
            Delete
          </button>
        </div>
      </div>
    </AppModal>
  );
}
