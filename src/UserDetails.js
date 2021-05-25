import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useEffect, useState } from "react";

export default function UserDetails(props) {
  const [userData, setUserData] = useState({ result: {} });

  useEffect(() => {
    //cerrando y abriendo se llama ...
    //tengo que meter un condicional...
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then((response) => response.json())
      .then((response) => {
        setUserData({ result: { response } });
      });
  }, [props.userId]);

  return (
    <div>
      <Dialog
        open={props.show}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"User Details"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {userData.result.response && userData.result.response.name}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
