import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../../contexts/CitiesContext";
import Flag from "react-world-flags";
import { formatDate } from "../../helpers";

function CityItem({ city }) {
	const {
		cityName,
		id,
		emoji,
		date,
		position: { lat, lng },
	} = city;

	const { setCities } = useCities();

	function handleClick(e) {
		e.preventDefault();

		setCities((cities) => cities.filter((city) => city.id !== id));
	}

	return (
		<li>
			<Link
				className={`${styles.cityItem} 				  `}
				to={`${id}?lat=${lat}&lng=${lng}`}
			>
				<Flag
					code={emoji}
					alt={`${city.country} flag`}
					width={30}
					height={20}
				/>

				<h3 className={styles.name}>{cityName}</h3>

				<time className={styles.date}>{`(${formatDate(date)})`}</time>

				<button className={styles.deleteBtn} onClick={handleClick}>
					&times;
				</button>
			</Link>
		</li>
	);
}

export default CityItem;
