import React, { useContext } from "react";

import { Navigate } from "react-router-dom";
import { GlobalContext } from "../Global/GlobalContext";

export const Private = ({ children }) => {
	const { current } = useContext(GlobalContext);

	return <div>{current ? children : <Navigate to='/login' />}</div>;
};
