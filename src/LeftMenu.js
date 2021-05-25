import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PeopleIcon from "@material-ui/icons/People";
import Home from "@material-ui/icons/Home";
import AddBox from "@material-ui/icons/AddBox";
import List from "@material-ui/core/List";

export default function LeftMenu(props) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    props.itemClicked(index);
  };

  return (
    <List>
      <ListItem
        selected={selectedIndex === 0}
        button
        onClick={(event) => handleListItemClick(event, 0)}
      >
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText primary="Welcome" />
      </ListItem>
      <ListItem
        selected={selectedIndex === 1}
        button
        onClick={(event) => handleListItemClick(event, 1)}
      >
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="User Lists" />
      </ListItem>
      <ListItem
        selected={selectedIndex === 2}
        button
        onClick={(event) => handleListItemClick(event, 2)}
      >
        <ListItemIcon>
          <AddBox />
        </ListItemIcon>
        <ListItemText primary="Add User" />
      </ListItem>
    </List>
  );
}
