import logo from "./logo.svg";
import "./App.css";
import Header from "./Components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./Components/Registration";
import HomeScreen from "./Components/HomeScreen";
import Login from "./Components/Login";
import { Private } from "./Components/Private";
import DetailedScreen from "./Components/DetailedScreen";

function App() {
	return (
		<div>
			<Router>
				<Header />
				<Routes>
					<Route
						path='/'
						element={
							<Private>
								<HomeScreen />
							</Private>
						}
					/>
					<Route path='/register' element={<Registration />} />
					<Route path='/login' element={<Login />} />
					<Route path='/user/:id' element={<DetailedScreen />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
