import React from "react";
import Layout from "./Layout.js";
import UsersForm from "./UserForm.js";
import UsersList from "./UsersList.js";
import LeftMenu from "./LeftMenu.js";
import Welcome from "./Welcome.js";

export default function App() {
  const [itemClicked, setItemClicked] = React.useState(0);

  function menuItemClicked(item) {
    setItemClicked(item);
  }

  return (
    <>
      <Layout left={<LeftMenu itemClicked={menuItemClicked} />}>
        {itemClicked === 0 && <Welcome />}
        {itemClicked === 1 && <UsersList />}
        {itemClicked === 2 && <UsersForm />}
      </Layout>
    </>
  );
}
