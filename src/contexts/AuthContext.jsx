import { useEffect, useReducer } from "react";
import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const initialState = { user: null, isAuthenticated: false };

function reducer(state, { type, payload }) {
	switch (type) {
		case "logged-in":
			return { ...state, user: payload, isAuthenticated: true };
		case "logged-out":
			return { ...state, user: null, isAuthenticated: false };

		default:
			return state;
	}
}

const FAKE_USER = {
	name: "Jack",
	email: "jack@example.com",
	password: "qwerty",
	avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }) {
	const [{ user, isAuthenticated }, dispatch] = useReducer(
		reducer,
		initialState
	);

	function login(email, password) {
		if (email === FAKE_USER.email && password === FAKE_USER.password)
			dispatch({ type: "logged-in", payload: FAKE_USER });
	}

	function logout() {
		dispatch({ type: "logged-out" });
	}

	console.log("AuthProvider");

	return (
		<AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

function useAuth() {
	const context = useContext(AuthContext);

	if (context === undefined) {
		throw new Error(`Error in AuthContext`);
	}

	return context;
}

export { AuthProvider, useAuth };
