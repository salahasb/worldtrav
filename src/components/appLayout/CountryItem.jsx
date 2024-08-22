import Flag from "react-world-flags";
import styles from "./CountryItem.module.css";

function CountryItem({ country }) {
	return (
		<li className={styles.countryItem}>
			<Flag
				code={country.emoji}
				alt={`${country.country} flag`}
				width={30}
				height={20}
				// className={styles.flag}
			/>
			<span>{country.country}</span>
		</li>
	);
}

export default CountryItem;
