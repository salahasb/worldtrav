import styles from "./CountryList.module.css";
import Message from "../Message";
import Spinner from "../Spinner";
import CountryItem from "./CountryItem";
import { useCities } from "../../contexts/CitiesContext";

function CountryList() {
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

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country, i) => (
        <CountryItem key={i} country={country} />
      ))}
    </ul>
  );
}

export default CountryList;
