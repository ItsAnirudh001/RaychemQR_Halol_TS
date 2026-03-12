"use client";

import { rowsPerPage } from "@/constants/admin/paginate-data";
import { PaginationProps } from "@/types/mui-types";
import { Box, TablePagination } from "@mui/material";

export default function MuiPagination(props: PaginationProps) {
  const { data, page, setPage } = props;

  const rowCount = data?.length;

  function handleChangePage(
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) {
    setPage(newPage);
  }

  if (data.length <= rowsPerPage) return <></>;

  return (
    <Box className="userlog-pagination">
      <TablePagination
        component="div"
        sx={{
          "& .MuiSvgIcon-root": {
            color: "rgba(0, 0, 0, 0.56)",
            fontSize: "1.25rem",
          },
          "& .MuiButtonBase-root.Mui-disabled .MuiSvgIcon-root": {
            opacity: 0.25,
          },
        }}
        slotProps={{
          displayedRows:{
            className:"font-medium! text-[0.92rem]!"
          }
        }}
        count={rowCount}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[]}
        labelRowsPerPage=""
        page={page}
        onPageChange={handleChangePage}
      />
    </Box>
  );
}
