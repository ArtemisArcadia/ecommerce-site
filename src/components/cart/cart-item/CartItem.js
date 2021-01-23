import React from "react";
import "./CartItem.css";

import { Box } from "@material-ui/core";

const CartItem = ({ title, cost, quantity }) => {
	return (
		<Box className="cart-item">
			<Box>{title}</Box>
			<Box className="cart-item-details">
				<Box className="cart-item-quantity">Qty: {quantity}</Box>
				<Box>£{cost.toFixed(2)}</Box>
			</Box>
		</Box>
	);
};

export default CartItem;
