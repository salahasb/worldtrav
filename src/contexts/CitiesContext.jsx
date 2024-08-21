import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useReducer,
} from "react";
import { makeRequest } from "../helpers";

const initialState = {
	cities: [],
	isLoading: false,
	error: "",
	city: {},
};

function reducer(state, { type, payload }) {
	const { cities } = state;
	switch (type) {
		case "sendRequest":
			return { ...state, isLoading: true };

		case "cities/loaded":
			return { ...state, isLoading: false, cities: payload };

		case "city/loaded":
			return { ...state, isLoading: false, city: payload };

		case "cities/created":
			return {
				...state,
				isLoading: false,
				cities: [...cities, payload],
				city: payload,
			};

		case "cities/deleted":
			return {
				...state,
				isLoading: false,
				cities: cities.filter((city) => city.id !== payload),
				// city: {},
			};

		case "error":
			return { ...state, isLoading: false, error: payload };

		default:
			return state;
	}
}

const CitiesContext = createContext();

const URL = "http://localhost:8000";

function CitiesProvider({ children }) {
	const [{ cities, isLoading, error, city }, dispatch] = useReducer(
		reducer,
		initialState
	);

	async function postCity(city) {
		const initPost = {
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(city),
		};

		try {
			dispatch({ type: "sendRequest" });

			const data = await makeRequest(`${URL}/cities`, initPost);

			dispatch({ type: "cities/created", payload: data });
		} catch (error) {
			console.error(error);
			dispatch({ type: "error", payload: error.message });
		}
	}

	async function deleteCity(id) {
		try {
			dispatch({ type: "sendRequest" });

			await makeRequest(`${URL}/cities/${id}`, {
				method: "DELETE",
			});

			dispatch({ type: "cities/deleted", payload: id });
		} catch (error) {
			console.error(error);
			dispatch({ type: "error", payload: error.message });
		}
	}

	const getCity = useCallback(async function getCity(id) {
		try {
			dispatch({ type: "sendRequest" });

			const res = await fetch(`${URL}/cities/${id}`);
			const data = await res.json();

			dispatch({ type: "city/loaded", payload: data });
		} catch (error) {
			console.error(error);
			dispatch({ type: "error", payload: error.message });
		}
	}, []);

	useEffect(() => {
		async function fetchCities() {
			try {
				dispatch({ type: "sendRequest" });

				const data = await makeRequest(`${URL}/cities`);

				dispatch({ type: "cities/loaded", payload: data });
			} catch (error) {
				console.error(error);
				dispatch({ type: "error", payload: error.message });
			}
		}

		fetchCities();
	}, []);

	return (
		<CitiesContext.Provider
			value={{
				cities,
				isLoading,
				city,
				error,
				postCity,
				deleteCity,
				getCity,
				dispatch,
			}}
		>
			{children}
		</CitiesContext.Provider>
	);
}

function useCities() {
	const context = useContext(CitiesContext);
	if (context === undefined)
		throw new Error(`the context was used outside of the correct provider`);
	return context;
}

export { CitiesProvider, useCities };
