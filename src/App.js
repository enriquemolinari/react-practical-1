import React from "react";
import Layout from "./Layout.js";
import UsersForm from "./UserForm.js";
import UsersList from "./UsersList.js";
import LeftMenu from "./LeftMenu.js";
import Welcome from "./Welcome.js";

export default function App() {
  const [itemClicked, setItemClicked] = React.useState(0);

  const apiUrl = process.env.REACT_APP_API_URL;

  function menuItemClicked(item) {
    setItemClicked(item);
  }

  return (
    <Layout left={<LeftMenu itemClicked={menuItemClicked} />}>
      {itemClicked === 0 && <Welcome />}
      {itemClicked === 1 && <UsersList apiUrl={apiUrl} />}
      {itemClicked === 2 && <UsersForm apiUrl={apiUrl} />}
    </Layout>
  );
}
