import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./form.css";

export default function UsersForm(props) {
  const [inputsValue, setInputsValue] = useState({});
  const [loading, setLoading] = useState(false);

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
        console.log(json);
      });
  }

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setInputsValue({ ...inputsValue, [name]: value });
  }

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <div className="form">
        {/* error={1} helperText="asdf" */}
        <TextField
          id="name"
          name="name"
          label="Name"
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
          fullWidth={true}
          value={inputsValue.value}
          onChange={handleChange}
        />
      </div>
      <div>
        <Button type="submit" variant="contained" color="primary">
          {loading && <CircularProgress color="white" size={24} />}
          {!loading && "Save"}
        </Button>
      </div>
    </form>
  );
}
