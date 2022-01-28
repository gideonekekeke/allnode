import React from "react";
import styled from "styled-components";

const Header = () => {
	return (
		<Container>
			<Logo>Logo</Logo>
			<ButtonHold>
				<button>Register</button>
				<button>Log in</button>
				<button>Log out</button>
			</ButtonHold>
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
