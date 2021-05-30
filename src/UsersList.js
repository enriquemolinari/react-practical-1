import { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import UserDetails from "./UserDetails";

const useStyles = makeStyles((theme) => ({
  box: {
    height: 50,
    display: "flex",
  },
  bottomRightBox: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  spreadBox: {
    justifyContent: "space-between",
    alignItems: "right",
  },
}));

export default function UsersList(props) {
  const [state, setPass] = useState({ result: { data: [] } });
  const [page, setPage] = useState(0);
  const [showDetail, setShowDetail] = useState(false);
  const [userId, setUserId] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    fetch(
      props.apiUrl +
        "?_page=" +
        //first page is 1 for the json server API
        //Material DataGrid first page is 0
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

  let userIdSelected = 0;
  const classes = useStyles();

  const columns = [
    { field: "id", headerName: "ID", width: 60 },
    { field: "name", headerName: "Name", width: 180, editable: true },
    { field: "username", headerName: "UserName", width: 200, editable: true },
    { field: "email", headerName: "Email", width: 250, editable: true },
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 16 }}
          onClick={() => openDetails(params.row)}
        >
          More...
        </Button>
      ),
    },
  ];

  function openDetails(params) {
    setUserId(params.id);
    setShowDetail(true);
  }

  function closeDetails() {
    setShowDetail(false);
  }

  function handleDelete() {
    alert("delete pressed...:" + userIdSelected);
  }

  function handleEditing(params) {
    console.log(params.field + " - " + params.props.value);
  }

  return (
    <>
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
          rowsPerPageOptions={[3, 5]}
          rowCount={parseInt(state.result.total)}
          //to delete the selected row
          onRowSelected={(e) => (userIdSelected = e.data.id)}
          //editing
          onEditCellChangeCommitted={(params) => handleEditing(params)}
          disableColumnMenu={true}
        />
      </div>
      <div>
        <Box
          component="div"
          className={`${classes.bottomRightBox} ${classes.box}`}
        >
          <Button variant="contained" color="primary" onClick={handleDelete}>
            Delete Selected User
          </Button>
        </Box>
      </div>
      {/* Estando asi, el useEffects de UserDetails se ejecuta...
      por eso tuve que poner un if en el callback. 
      ahora, si lo hago condicional, el componente no se monta, y entonces
      siempre al montarse ejecuta el useEffect aunque este abriendo de nuevo el popup
      para la misma fila*/}
      {/* {showDetail && ( */}
      <UserDetails
        apiUrl={props.apiUrl}
        userId={userId}
        show={showDetail}
        handleClose={closeDetails}
      />
      {/* )} */}
    </>
  );
}
