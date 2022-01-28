import React, { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext();

export const AuthState = ({ children }) => {
	const [current, setCurrent] = useState(null);

	useEffect(() => {
		const savedItem = JSON.parse(localStorage.getItem("user"));

		setCurrent(savedItem);
	}, []);

	return (
		<GlobalContext.Provider value={{ current }}>
			{children}
		</GlobalContext.Provider>
	);
};
