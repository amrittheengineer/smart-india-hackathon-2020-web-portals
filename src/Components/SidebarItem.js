import React from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core";

const SidebarItem = ({ title, iconComponent, isActive }) => {
  return (
    <React.Fragment key={title}>
      <ListItem button selected={isActive} style={{ padding: "16px" }}>
        <ListItemIcon>{iconComponent}</ListItemIcon>
        <ListItemText primary={title} />
      </ListItem>
      <Divider />
    </React.Fragment>
  );
};
export default SidebarItem;
