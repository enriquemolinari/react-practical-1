import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function UserDetails(props) {
  const [userData, setUserData] = useState({ result: {} });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (props.userId > 0) {
      fetch(props.apiUrl + "/" + props.userId)
        .then((response) => response.json())
        .then((response) => {
          setUserData({ result: { response } });
          setLoading(false);
        });
    }
    /*El clean up se ejecuta antes de useEffect pero SOLO 
     si este va a ejecutarse. Con lo cual si no cambio el userId, sigue estando el valor
     anterior. Solo si cambia, entonces primero lo limpia.
     Si no pongo esto, se ve el json anterior y despues se reemplaza
     cuando vuelve el json nuevo del fetch*/
    return setLoading(true);
  }, [props.userId]);

  return (
    <Dialog
      open={props.show}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"User Details"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {loading ? (
            <CircularProgress />
          ) : (
            <table>
              <tbody>
                <tr>
                  <td>Name: </td>
                  <td>{userData.result.response.name}</td>
                </tr>
                <tr>
                  <td>User Name: </td>
                  <td>{userData.result.response.username}</td>
                </tr>
                <tr>
                  <td>Website: </td>
                  <td>{userData.result.response.website}</td>
                </tr>
                <tr>
                  <td>Address: </td>
                  <td>
                    {userData.result.response.address.street +
                      " - " +
                      userData.result.response.address.city}
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
