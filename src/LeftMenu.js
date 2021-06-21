import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PeopleIcon from "@material-ui/icons/People";
import Home from "@material-ui/icons/Home";
import AddBox from "@material-ui/icons/AddBox";
import List from "@material-ui/core/List";

export default function LeftMenu(props) {
  function handleListItemClick(item) {
    props.handleMenu(item);
  }

  return (
    <List>
      <ListItem
        selected={props.valueItem === props.items.WELCOME}
        button
        onClick={() => handleListItemClick(props.items.WELCOME)}
      >
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText primary="Welcome" />
      </ListItem>
      <ListItem
        selected={props.valueItem === props.items.USERSLIST}
        button
        onClick={() => handleListItemClick(props.items.USERSLIST)}
      >
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="User Lists" />
      </ListItem>
      <ListItem
        selected={props.valueItem === props.items.USERFORM}
        button
        onClick={() => handleListItemClick(props.items.USERFORM)}
      >
        <ListItemIcon>
          <AddBox />
        </ListItemIcon>
        <ListItemText primary="Add User" />
      </ListItem>
    </List>
  );
}
