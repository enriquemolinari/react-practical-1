import { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 80 },
  { field: "name", headerName: "Name", width: 250 },
  { field: "username", headerName: "UserName", width: 250 },
  { field: "email", headerName: "Email", width: 250 },
];

export default function UsersList() {
  const [state, setPass] = useState({ result: { data: [] } });
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    fetch(
      "https://jsonplaceholder.typicode.com/users?_page=" +
        //first page is 1 for json server
        //Materia DataGrid first page is 0
        (page + 1) +
        "&_limit=" +
        pageSize
    )
      .then((response) =>
        response.json().then((json) => ({
          total: response.headers.get("x-total-Count"),
          data: json,
        }))
      )
      .then((response) => {
        setPass({ result: { total: response.total, data: response.data } });
      });
  }, [page, pageSize]);

  return (
    <div style={{ height: 420, width: "100%" }}>
      <DataGrid
        rows={state.result.data}
        columns={columns}
        pageSize={pageSize}
        paginationMode="server"
        page={page}
        onPageChange={(params) => {
          setPage(params.page);
        }}
        onPageSizeChange={(params) => {
          setPageSize(params.pageSize);
        }}
        rowsPerPageOptions={[1, 5]}
        rowCount={parseInt(state.result.total)}
      />
    </div>
  );
}
