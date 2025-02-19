import React from "react";
import { AppBar, Box, CssBaseline, Drawer, Toolbar, Typography, List } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import SidebarItem from "./SidebarItem";

const drawerWidth: number = 240;
const sidebarBgColor: string = "#000000";
const backgroundColor: string = "#f5f5f5";
const textColor: string = "#FFFFFF";
const iconColor: string = "#FFFFFF";

const Dashboard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: sidebarBgColor,
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ color: textColor }}>
            Agility Feat Demo - Diego Cárdenas
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: sidebarBgColor,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          },
        }}
      >
        <Box>
          <Toolbar />
          <List>
            <SidebarItem text="Dashboard" icon={<DashboardIcon />} path="/" textColor={textColor} iconColor={iconColor} />
            <SidebarItem text="Mantenimiento" icon={<SettingsIcon />} path="/maintenance" textColor={textColor} iconColor={iconColor} />
          </List>
        </Box>

        <Box sx={{ backgroundColor: sidebarBgColor, height: "56px" }}>
          <Toolbar />
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: backgroundColor, minHeight: "100vh" }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Dashboard;
