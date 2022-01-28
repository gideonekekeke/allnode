import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GlobalContext } from "../Global/GlobalContext";

const Header = () => {
	const { current } = useContext(GlobalContext);

	return (
		<Container>
			<Link
				style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}
				to='/'>
				<Logo>Logo</Logo>
			</Link>
			{current ? (
				<ButtonHold>
					{" "}
					<button
						onClick={() => {
							localStorage.removeItem("user");
							window.location.reload();
						}}>
						Log out
					</button>
				</ButtonHold>
			) : (
				<ButtonHold>
					<Link to='/register'>
						<button>Register</button>
					</Link>
					<Link to='/login'>
						{" "}
						<button>Log in</button>
					</Link>
				</ButtonHold>
			)}
		</Container>
	);
};

export default Header;

const ButtonHold = styled.div`
	display: flex;

	button {
		height: 50px;
		width: 170px;
		margin: 10px;
		font-weight: bold;
		background-color: ${({ bg }) => bg};
	}
`;
const Logo = styled.div`
	display: flex;
`;

const Container = styled.div`
	height: 100px;
	width: 100%;
	background-color: #123456;
	color: white;
	justify-content: space-around;
	align-items: center;
	display: flex;
`;
