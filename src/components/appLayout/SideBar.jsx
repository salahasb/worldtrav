import { IoClose } from "react-icons/io5";
import Logo from "../Logo";
import AppNav from "./AppNav";
import styles from "./Sidebar.module.css";
import { Outlet } from "react-router-dom";

function SideBar({ showSidebar, setShowSidebar }) {
	return (
		<div className={`${styles.sidebar} ${showSidebar ? styles.show : ""}`}>
			<button onClick={() => setShowSidebar(false)}>
				<IoClose />
			</button>

			<Logo />
			<AppNav />
			<Outlet />
			<footer className={styles.footer}>
				<p className={styles.copyright}>© Copyright 2023 by WorldWise Inc.</p>
			</footer>
		</div>
	);
}

export default SideBar;
