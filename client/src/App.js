import logo from "./logo.svg";
import "./App.css";
import Header from "./Components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./Components/Registration";
import HomeScreen from "./Components/HomeScreen";

function App() {
	return (
		<div>
			<Router>
				<Header />
				<Routes>
					<Route path='/' element={<HomeScreen />} />
					<Route path='/register' element={<Registration />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
