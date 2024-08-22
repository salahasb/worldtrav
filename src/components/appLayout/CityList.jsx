import { useCities } from "../../contexts/CitiesContext";
import Message from "../Message";
import CityItem from "./CityItem";
import styles from "./CityList.module.css";

function CityList() {
	const { cities } = useCities();

	if (!cities || !cities.length) {
		return (
			<Message>Add your first city by clicking on a city on the map</Message>
		);
	}

	return (
		<ul className={styles.cityList}>
			{cities.map((city, i) => (
				<CityItem key={i} city={city} />
			))}
		</ul>
	);
}

export default CityList;
