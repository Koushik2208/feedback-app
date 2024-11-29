import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import Avatar from "@mui/material/Avatar";

import "../../globals.css";
import Seperator from "../Seperator";
import styles from "./Navbar.module.css";
import Searchbar from "../Searchbar/Searchbar";

const Navbar = () => {
  return (
    <>
      <Box sx={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 10 }}>
        <section className={styles.navbar}>
          <img
            src={require(".././images/logo.webp")}
            className={styles.logo}
            alt="logo"
            onClick={() => (window.location.href = "/")}
          />
          <Seperator direction={"vertical"} />
          <Searchbar />
          <Avatar
            alt="user"
            src={require(".././images/avatar.png")}
            style={{ marginLeft: "auto" }}
          />
        </section>
      </Box>
      <Outlet />
    </>
  );
};

export default Navbar;
