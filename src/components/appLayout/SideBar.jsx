import { IoClose } from "react-icons/io5";
import Logo from "../Logo";
import AppNav from "./AppNav";
import styles from "./Sidebar.module.css";
import { Outlet } from "react-router-dom";
import Copyright from "./Copyright";

function SideBar({ showSidebar, setShowSidebar }) {
	return (
		<div className={`${styles.sidebar} ${showSidebar ? styles.show : ""}`}>
			<button onClick={() => setShowSidebar(false)}>
				<IoClose />
			</button>

			<Logo />
			<AppNav />
			<Outlet />
			<Copyright />
		</div>
	);
}

export default SideBar;
