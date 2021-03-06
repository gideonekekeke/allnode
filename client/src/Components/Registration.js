import React from "react";
import styled from "styled-components";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

const Registration = () => {
	const [image, setImage] = React.useState("");
	const [imageDB, setImageDB] = React.useState("");

	const UploadImage = (e) => {
		const file = e.target.files[0];
		const fileRef = URL.createObjectURL(file);
		setImage(fileRef);
		setImageDB(file);
	};

	const schema = yup.object().shape({
		name: yup.string().required("this filed is required"),
		email: yup.string().required("this filed is required").email(),
		password: yup.string().required("this filed is required"),
	});

	const {
		register,
		formState: { error },
		handleSubmit,
		reset,
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = handleSubmit(async (val) => {
		console.log(val);
		const { name, email, password } = val;

		const formData = new FormData();

		formData.append("userName", name);
		formData.append("email", email);
		formData.append("password", password);
		formData.append("image", imageDB);

		const config = {
			headers: {
				"content-type": "multipart/form-data",
			},
		};

		await axios.post("http://localhost:9090/register", formData, config);
		reset();
		setImage("");
	});

	return (
		<Container>
			<Card onSubmit={onSubmit}>
				<ImagePreview src={image} />
				<input
					onChange={UploadImage}
					accept='image/png, image/jpeg, image/pdf'
					type='file'
				/>
				<input {...register("name")} placeholder='userName' />
				<input {...register("email")} placeholder='email' />
				<input {...register("password")} placeholder='password' />
				<button type='submit'>Submit</button>
			</Card>
		</Container>
	);
};

export default Registration;

const ImagePreview = styled.img`
	height: 100px;
	width: 100px;
	background-color: silver;
	border-radius: 50%;
	object-fit: cover;
`;

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;
const Card = styled.form`
	display: flex;

	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 100px;
	background-color: #123456;
	width: 450px;
	height: 500px;
	border-radius: 10px;

	input {
		width: 400px;
		height: 40px;
		margin: 10px;

		::placeholder {
			font-size: 15px;
			padding-left: 10px;
		}
	}

	button {
		width: 300px;
		height: 50px;
	}
`;
