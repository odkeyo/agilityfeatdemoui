import React from "react";
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface SidebarItemProps {
  text: string;
  icon: React.ReactNode;
  path: string;
  textColor?: string;
  iconColor?: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ text, icon, path, textColor = "#000000", iconColor = "#000000" }) => {
  const navigate = useNavigate();

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={() => navigate(path)}>
        <ListItemIcon sx={{ color: iconColor }}>{icon}</ListItemIcon>
        <ListItemText primary={text} sx={{ color: textColor }} />
      </ListItemButton>
    </ListItem>
  );
};

export default SidebarItem;
