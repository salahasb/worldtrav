import Flag from "react-world-flags";
import styles from "./CountryItem.module.css";

function CountryItem({ country }) {
	const words = country.country.split(" ");
	const countyName = words.slice(0, 2).join(" ");

	return (
		<li className={styles.countryItem}>
			<Flag
				code={country.emoji}
				alt={`${country.country} flag`}
				width={30}
				height={20}
				// className={styles.flag}
			/>
			<span>{countyName}</span>
		</li>
	);
}

export default CountryItem;
