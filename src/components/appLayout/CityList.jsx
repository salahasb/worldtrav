import { useCities } from "../../contexts/CitiesContext";
import Message from "../Message";
import Spinner from "../Spinner";
import CityItem from "./CityItem";
import styles from "./CityList.module.css";

function CityList() {
	const { cities, isLoading, error } = useCities();

	if (isLoading) {
		return <Spinner />;
	}

	if (error) {
		return <Message>{error}</Message>;
	}

	if (!cities.length) {
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
