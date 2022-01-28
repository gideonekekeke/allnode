import React from "react";
import styled from "styled-components";

const HomeScreen = () => {
	return (
		<Container>
			<Card>
				<UserImage />
				<NameUser>name</NameUser>
				<NameUser>Email</NameUser>
			</Card>
		</Container>
	);
};

export default HomeScreen;

const Container = styled.div``;
const Card = styled.div``;
const UserImage = styled.div``;
const NameUser = styled.div``;
