import React, { useState } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";

import { Box, Button, Typography } from "@material-ui/core";

import "./CheckoutForm.css";

const CheckoutForm = ({ stripe, totalCost }) => {
	const [status, setStatus] = useState("default");

	const submit = async (event) => {
		event.preventDefault();

		setStatus("submitting");

		try {
			let { token } = await stripe.createToken({ name: "Name" });

			let response = await fetch("./netlify/functions/charge", {
				method: "POST",
				body: JSON.stringify({
					amount: totalCost * 100,
					token: token.id,
				}),
			});
			if (response.ok) {
				setStatus("complete");
			} else {
				throw new Error("Network response was not ok.");
			}
		} catch (err) {
			setStatus("error");
		}
	};
	//when a purchase has been completed
	if (status === "complete") {
		return <Box className="checkout-form-complete"> Payment Successful! </Box>;
	}

	return (
		<form className="checkout-form" onSubmit={submit}>
			<Typography variant="h4">
				Would you like to complete the purchase?
			</Typography>
			<CardElement />
			<Button
				className="checkout-form-button"
				type="submit"
				disabled={status === "submitting"}
			>
				{status === "submitting" ? "Submitting" : "Submit Order"}
			</Button>
			{status === "error" && (
				<Box className="checkout-form-error"> Something went wrong.</Box>
			)}
		</form>
	);
};

export default injectStripe(CheckoutForm);
