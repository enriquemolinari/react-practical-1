import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

export default function UsersForm() {
  return (
    <form noValidate autoComplete="off">
      <div>
        {/* error={1} helperText="asdf" */}
        <TextField id="name" label="Name" />
      </div>
      <div>
        <TextField id="username" label="User Name" />
      </div>
      <div>
        <TextField id="email" label="EMail" />
      </div>
    </form>
  );
}
