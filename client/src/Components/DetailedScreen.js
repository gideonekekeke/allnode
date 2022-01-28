import React, { useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../Global/GlobalContext";

const DetailedScreen = () => {
	const { id } = useParams();
	const { current } = useContext(GlobalContext);
	const [name, setName] = React.useState("");
	// console.log("htdjf", id);

	const [data, setData] = React.useState([]);

	const fetchData = async () => {
		const res = await axios.get(`http://localhost:9090/user/${id}`);

		setData(res.data.data);
		console.log("sdghjk", res.data.data);
	};

	const editUser = async () => {
		const config = {
			headers: {
				authorization: `a b ${current?.token}`,
			},
		};

		const res = await axios.patch(
			`http://localhost:9090/user/${id}`,
			{ userName: name },
			config,
		);
		console.log("Update Done", res);
		return res;
	};

	React.useEffect(() => {
		fetchData();
	}, []);

	return (
		<Container>
			<Card>
				<UserImage src={`http://localhost:9090/${data.avatar}`} />
				<NameHold>
					{" "}
					<NameUser>{data.userName}</NameUser>
					<NameUser>{data.email}</NameUser>
				</NameHold>
				<br />
				<br />
				<input
					value={name}
					onChange={(e) => {
						setName(e.target.value);
					}}
					placeholder='edit your name'
				/>
				<button
					onClick={() => {
						editUser();
						window.location.reload();
					}}>
					Edit
				</button>
			</Card>
		</Container>
	);
};

export default DetailedScreen;

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
	/* align-items: center; */
	margin: 20px;
	border-radius: 10px;
	flex-direction: column;
`;
const UserImage = styled.img`
	height: 200px;
	width: 100%;
	background: #123456;
	object-fit: cover;
	border: none;
	border-radius: 10px;
`;
const NameUser = styled.div``;
