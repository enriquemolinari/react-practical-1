import React from "react";
import Layout from "./Layout.js";
import UsersForm from "./UserForm.js";
import UsersList from "./UsersList.js";
import LeftMenu from "./LeftMenu.js";
import Welcome from "./Welcome.js";

export default function App() {
  const MENU_ITEMS = {
    WELCOME: 0,
    USERSLIST: 1,
    USERFORM: 2,
  };
  const [itemClicked, setItemClicked] = React.useState(MENU_ITEMS.WELCOME);
  const apiUrl = process.env.REACT_APP_API_URL;

  function handleClick(item) {
    setItemClicked(item);
  }

  return (
    <Layout
      left={
        <LeftMenu
          items={MENU_ITEMS}
          handleMenu={handleClick}
          valueItem={itemClicked}
        />
      }
    >
      {itemClicked === MENU_ITEMS.WELCOME && <Welcome />}
      {itemClicked === MENU_ITEMS.USERSLIST && <UsersList apiUrl={apiUrl} />}
      {itemClicked === MENU_ITEMS.USERFORM && <UsersForm apiUrl={apiUrl} />}
    </Layout>
  );
}
