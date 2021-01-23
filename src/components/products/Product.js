import React from "react";
import "./Product.css";

import { Box, Button, Typography } from "@material-ui/core";

const Product = ({ onAddToCart, price, title }) => {
	return (
		<Box className="product">
			<Typography className="product-title" variant="h3">
				{title}
			</Typography>
			<Box className="product-price">{`£${price}`}</Box>
			<Button className="product-buy" onClick={onAddToCart} variant="outlined">
				{" "}
				Add to cart
			</Button>
		</Box>
	);
};

export default Product;
