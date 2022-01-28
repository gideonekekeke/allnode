import React from "react";
import styled from "styled-components";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const Registration = () => {
	const schema = yup.object().shape({
		userName: yup.string().required("this filed is required"),
		email: yup.string().required("this filed is required").email(),
		password: yup.string().required("this filed is required"),
	});

	const {
		register,
		formState: { error },
		handleSubmit,
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = handleSubmit(async (val) => {
		console.log(val);
	});

	return (
		<Container>
			<Card onSubmit={onSubmit}>
				<ImagePreview />
				<input accept='image/png, image/jpeg, image/pdf' type='file' />
				<input {...register("userName")} placeholder='userName' />
				<input {...register("email")} placeholder='email' />
				<input {...register("password")} placeholder='password' />
				<button type='submit'>Submit</button>
			</Card>
		</Container>
	);
};

export default Registration;

const ImagePreview = styled.div`
	height: 100px;
	width: 100px;
	background-color: silver;
	border-radius: 50%;
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
