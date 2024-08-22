// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import { useUrlPosition } from "../../hooks/useUrlPosition";
import Message from "../Message";
import Spinner from "../Spinner";
import { useCities } from "../../contexts/CitiesContext";

import Flag from "react-world-flags";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function convertToEmoji(countryCode) {
	const codePoints = countryCode
		.toUpperCase()
		.split("")
		.map((char) => 127397 + char.charCodeAt());
	return String.fromCodePoint(...codePoints);
}

function Form() {
	const [cityName, setCityName] = useState("");
	const [country, setCountry] = useState("");
	const [date, setDate] = useState(new Date());
	const [notes, setNotes] = useState("");
	const [emoji, setEmoji] = useState("");

	const [geoIsLoading, setGeoIsLoading] = useState(false);
	const [error, setError] = useState("");

	const [lat, lng] = useUrlPosition();

	const navigate = useNavigate();

	const { setCities } = useCities();

	// to add city to local storage
	async function uploadCity(e) {
		e.preventDefault();

		const city = {
			id: Date.now(),
			cityName,
			country,
			emoji,
			date,
			notes,
			position: { lat, lng },
		};

		setCities((cities) => [...cities, city]);

		navigate("/app/cities");
	}

	// to get the city info from api to show in the form before submitting
	useEffect(() => {
		async function fetchCityInfo() {
			try {
				setGeoIsLoading(true);

				const res = await fetch(
					`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
				);
				console.log(lat, lng);
				if (!res.ok) throw new Error(`Something Went very wrong  `);

				const data = await res.json();

				const { city, countryCode, countryName } = data;
				console.log(data);
				if (!city)
					throw new Error(
						`That doesn't seem to be a city. Click somewhere else 😉`
					);

				setCityName(city);
				setCountry(countryName);
				setEmoji(countryCode);
				setError("");
			} catch (error) {
				console.error(error);
				setError(error.message);
			} finally {
				setGeoIsLoading(false);
			}
		}

		fetchCityInfo();
	}, [lat, lng]);

	if (geoIsLoading) {
		return <Spinner />;
	}

	if (error) {
		return <Message>{error}</Message>;
	}

	return (
		// <form className={`${styles.form} ${isLoading ? styles.loading : ""}`}>
		<form className={`${styles.form}`}>
			<div className={styles.row}>
				<label htmlFor="cityName">City name</label>
				<input
					id="cityName"
					onChange={(e) => setCityName(e.target.value)}
					value={cityName}
				/>
				{/* <span className={styles.flag}>{emoji}</span> */}
				<Flag
					code={emoji}
					alt={`${country} flag`}
					width={30}
					height={20}
					className={styles.flag}
				/>
			</div>

			<div className={styles.row}>
				<label htmlFor="date">When did you go to {cityName}?</label>
				<DatePicker
					selected={date}
					id="date"
					onChange={(date) => setDate(date)}
					value={date}
					dateFormat="dd/MM/yyyy"
				/>
			</div>

			<div className={styles.row}>
				<label htmlFor="notes">Notes about your trip to {cityName}</label>
				<textarea
					id="notes"
					onChange={(e) => setNotes(e.target.value)}
					value={notes}
				/>
			</div>

			<div className={styles.buttons}>
				<Button type="primary" onClick={uploadCity}>
					Add
				</Button>

				<Button
					type="back"
					onClick={(e) => {
						e.preventDefault();
						navigate(-1);
					}}
				>
					&larr; Back
				</Button>
			</div>
		</form>
	);
}

export default Form;
