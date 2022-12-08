import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./Layout.module.css";

function Layout() {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <div>MAIN</div>
    </div>
  );
}

export default Layout;
