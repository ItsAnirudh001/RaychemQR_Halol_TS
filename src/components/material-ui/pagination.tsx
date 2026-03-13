"use client";

import { rowsPerPage } from "@/constants/admin/paginate-data";
import { PaginationProps } from "@/types/mui-types";
import { Box, TablePagination, Typography } from "@mui/material";

export default function MuiPagination(props: PaginationProps) {
  const { data, page, setPage } = props;

  const rowCount = data?.length;
  const totalPages = Math.ceil(rowCount / rowsPerPage);

  function handleChangePage(
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) {
    setPage(newPage);
  }

  function displayLabel() {
    return (
      <Typography component="span" className="font-semibold! text-[0.85rem]! text-gray-600!">{`Page ${page + 1} of ${totalPages}`}</Typography>
    );
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
        count={rowCount}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[]}
        labelDisplayedRows={displayLabel}
        page={page}
        onPageChange={handleChangePage}
      />
    </Box>
  );
}
