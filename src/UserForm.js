import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import "./form.css";

export default function UsersForm(props) {
  const [inputsValue, setInputsValue] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorInputs, setErrorInputs] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    fetch(props.apiUrl, {
      method: "POST",
      body: JSON.stringify({
        name: inputsValue.name,
        userName: inputsValue.username,
        email: inputsValue.email,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setLoading(false);
        setErrorInputs({});
        checkResponse(json);
      });
  }

  function handleClose() {
    setShowSuccess(false);
  }

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setInputsValue({ ...inputsValue, [name]: value });
  }

  function checkResponse(json) {
    if (json.name && json.userName && json.email) {
      setShowSuccess(true);
    }
    if (!json.name) {
      setErrorInputs((errorInputs) => ({
        ...errorInputs,
        name: "This field is required",
      }));
    }
    if (!json.userName) {
      setErrorInputs((errorInputs) => ({
        ...errorInputs,
        username: "This field is required",
      }));
    }
    if (!json.email) {
      setErrorInputs((errorInputs) => ({
        ...errorInputs,
        email: "This field is required",
      }));
    }
  }

  return (
    <>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <div className="form">
          <TextField
            id="name"
            name="name"
            label="Name"
            error={typeof errorInputs.name !== "undefined"}
            helperText={errorInputs.name ? errorInputs.name : ""}
            required={true}
            fullWidth={true}
            value={inputsValue.value}
            onChange={handleChange}
          />
        </div>
        <div className="form">
          <TextField
            id="username"
            name="username"
            label="User Name"
            error={typeof errorInputs.username !== "undefined"}
            helperText={errorInputs.username ? errorInputs.username : ""}
            required={true}
            fullWidth={true}
            value={inputsValue.value}
            onChange={handleChange}
          />
        </div>
        <div className="form">
          <TextField
            id="email"
            name="email"
            label="EMail"
            error={typeof errorInputs.email !== "undefined"}
            helperText={errorInputs.email ? errorInputs.email : ""}
            required={true}
            fullWidth={true}
            value={inputsValue.value}
            onChange={handleChange}
          />
        </div>
        <div>
          <Button type="submit" variant="contained" color="primary">
            {loading && <CircularProgress color="inherit" size={24} />}
            {!loading && "Save"}
          </Button>
        </div>
      </form>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={showSuccess}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          User Created Successfully !
        </Alert>
      </Snackbar>
    </>
  );
}
