import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../../contexts/CitiesContext";

function CityItem({ city }) {
	const {
		cityName,
		id,
		emoji,
		date,
		position: { lat, lng },
	} = city;

	const {
		city: { id: cityId },
		deleteCity,
	} = useCities();

	function handleClick(e) {
		e.preventDefault();
		deleteCity(id);
		// console.log("removed");
	}

	const formatDate = (date) =>
		new Intl.DateTimeFormat("en", {
			day: "numeric",
			month: "long",
			year: "numeric",
			weekday: "long",
		}).format(new Date(date));

	return (
		<li>
			<Link
				className={`${styles.cityItem}  ${
					cityId === id ? styles["cityItem--active"] : ""
				}`}
				to={`${id}?lat=${lat}&lng=${lng}`}
			>
				<span className={styles.emoji}>{emoji}</span>
				<h3 className={styles.name}>{cityName}</h3>
				<time className={styles.date}>{formatDate(date)}</time>
				<button className={styles.deleteBtn} onClick={handleClick}>
					&times;
				</button>
			</Link>
		</li>
	);
}

export default CityItem;
