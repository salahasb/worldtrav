import { useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useCities } from "../../contexts/CitiesContext";
import ButtonBack from "../ButtonBack";
import Flag from "react-world-flags";

const formatDate = (date) =>
	new Intl.DateTimeFormat("en", {
		day: "numeric",
		month: "long",
		year: "numeric",
		weekday: "long",
	}).format(new Date(date));

function City() {
	const { id } = useParams();

	const { cities } = useCities();

	if (!cities || !cities.length) return;

	const city = cities.find((city) => city.id === +id);
	const { cityName, emoji, date, notes } = city;

	return (
		<div className={styles.city}>
			<div className={styles.row}>
				<h6>City name</h6>
				<h3>
					<Flag
						code={emoji}
						alt={`${city.country} flag`}
						width={30}
						height={20}
						className={styles.flag}
					/>{" "}
					{cityName}
				</h3>
			</div>

			<div className={styles.row}>
				<h6>You went to {cityName} on</h6>
				<p>{formatDate(date || null)}</p>
			</div>

			{notes && (
				<div className={styles.row}>
					<h6>Your notes</h6>
					<p>{notes}</p>
				</div>
			)}

			<div className={styles.row}>
				<h6>Learn more</h6>
				<a
					href={`https://en.wikipedia.org/wiki/${cityName}`}
					target="_blank"
					rel="noreferrer"
				>
					Check out {cityName} on Wikipedia &rarr;
				</a>
			</div>

			<div>
				<ButtonBack />
			</div>
		</div>
	);
}

export default City;
