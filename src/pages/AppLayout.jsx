import SideBar from "../components/appLayout/SideBar";
import Map from "../components/appLayout/Map";
import styles from "./AppLayout.module.css";
// import { Outlet, useParams, useSearchParams } from "react-router-dom";
import { CitiesProvider } from "../contexts/CitiesContext";
import User from "../components/User";
import { IoMenu } from "react-icons/io5";

export default function AppLayout() {
	return (
		<div className={styles.app}>
			<CitiesProvider>
				<header>
					<IoMenu size={32} color="#aaa" />
					<User className="nav" />
				</header>

				<SideBar />
				<Map />
				<User className="map" />
			</CitiesProvider>
		</div>
	);
}
