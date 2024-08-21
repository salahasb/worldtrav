import SideBar from "../components/appLayout/SideBar";
import Map from "../components/appLayout/Map";
import styles from "./AppLayout.module.css";
// import { Outlet, useParams, useSearchParams } from "react-router-dom";
import { CitiesProvider } from "../contexts/CitiesContext";
import User from "../components/User";

export default function AppLayout() {
	console.log("appLayput");

	return (
		<div className={styles.app}>
			<CitiesProvider>
				<SideBar />
				<Map />
				<User />
			</CitiesProvider>
		</div>
	);
}
