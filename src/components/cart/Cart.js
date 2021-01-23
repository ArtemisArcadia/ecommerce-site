import React from "react";
import CartItem from "./cart-item/CartItem";

import "./Cart.css";

import { Box, Typography } from "@material-ui/core";

const Cart = ({ itemsInCart, totalCost }) => {
	return (
		<Box className="cart">
			<Typography className="cart-title" variant="h2">
				Your shopping cart
			</Typography>
			{itemsInCart.length > 0 ? (
				<Box>
					{itemsInCart.map((item) => (
						<CartItem
							key={item.id}
							title={item.title}
							cost={item.price * item.quantity}
							quantity={item.quantity}
						/>
					))}

					<Box className="cart-total-cost">
						Total cost: £{totalCost.toFixed(2)}
					</Box>
				</Box>
			) : (
				<Box> Your cart is empty</Box>
			)}
		</Box>
	);
};

export default Cart;
