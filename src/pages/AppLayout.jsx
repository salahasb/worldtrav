import SideBar from "../components/appLayout/SideBar";
import Map from "../components/appLayout/Map";
import styles from "./AppLayout.module.css";
// import { Outlet, useParams, useSearchParams } from "react-router-dom";
import { CitiesProvider } from "../contexts/CitiesContext";
import User from "../components/User";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";

export default function AppLayout() {
	const [showSidebar, setShowSidebar] = useState(false);

	return (
		<div className={styles.app}>
			<CitiesProvider>
				<header>
					<IoMenu
						size={32}
						color="#aaa"
						onClick={() => setShowSidebar((s) => !s)}
					/>
					<User className="nav" />
				</header>

				<SideBar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
				<Map setShowSidebar={setShowSidebar} />
				<User className="map" />
			</CitiesProvider>
		</div>
	);
}
