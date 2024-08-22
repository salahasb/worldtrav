import { createContext, useContext } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { LOCAL_STORAGE_NAME } from "../constants";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
	const [cities, setCities] = useLocalStorage(LOCAL_STORAGE_NAME, []);

	return (
		<CitiesContext.Provider
			value={{
				cities,
				setCities,
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
