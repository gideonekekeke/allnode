import React from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";

const HomeScreen = () => {
	const [data, setData] = React.useState([]);

	const fetchData = async () => {
		const res = await axios.get("http://localhost:9090/users");

		setData(res.data.data);
		console.log(res.data.data);
	};

	React.useEffect(() => {
		fetchData();
	}, []);

	return (
		<Container>
			{data.map((props) => (
				<Card key={props.id}>
					<Link to={`/user/${props._id}`}>
						{" "}
						<UserImage src={`http://localhost:9090/${props.avatar}`} />
					</Link>
					<NameHold>
						{" "}
						<NameUser>{props.userName}</NameUser>
						<NameUser>{props.email}</NameUser>
					</NameHold>
				</Card>
			))}
		</Container>
	);
};

export default HomeScreen;

const NameHold = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	margin-left: 50px;

	font-size: 20px;
	font-weight: bold;
`;

const Container = styled.div`
	margin: 30px;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`;
const Card = styled.div`
	height: 200px;
	width: 500px;
	background: silver;
	display: flex;
	/* justify-content: center; */
	align-items: center;
	margin: 20px;
	border-radius: 10px;
`;
const UserImage = styled.img`
	height: 200px;
	width: 200px;
	background: #123456;
	object-fit: cover;
	border: none;
`;
const NameUser = styled.div``;
