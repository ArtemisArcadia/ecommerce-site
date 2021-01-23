import React, { useState } from "react";

//stripe elements - payment method
import { Elements, StripeProvider } from "react-stripe-elements";

//items from the hardcoded api, can switch out for actually database of items
import items from "./api/api";

//import product component, displays products
import Product from "./components/products/Product";

//cart import, this is for cart and items in cart calcualtes prices
import Cart from "./components/cart/Cart";

//import checkout form
import CheckoutForm from "./components/checkout-form/CheckoutForm";

//material-ui component imports
import { AppBar, Box, Toolbar, Typography } from "@material-ui/core";

import "./App.css";
import logo from "./logo.svg";

const App = () => {
	const [itemsInCart, setItemsInCart] = useState([]);

	const handleAddToCart = (id) => {
		setItemsInCart((itemsInCart) => {
			const itemInCart = itemsInCart.find((item) => item.id === id);

			//if in cart, update the amount
			if (itemInCart) {
				return itemsInCart.map((item) => {
					if (item.id !== id) {
						return item;
					}
					return { ...itemInCart, quantity: item.quantity + 1 };
				});
			}

			//if not add a new item to cart
			const item = items.find((item) => item.id === id);
			return [...itemsInCart, { ...item, quantity: 1 }];
		});
	};

	const totalCost = itemsInCart.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0
	);

	return (
		<Box className="app">
			<AppBar className="app-header" position="static">
				<Toolbar>
					<img src={logo} className="app-logo" alt="logo" />

					<Typography className="app-header-text" variant="h3">
						Shop Header
					</Typography>
				</Toolbar>
			</AppBar>

			<Box className="app-shop" component="main">
				<Box className="app-products">
					{items.map((item) => (
						<Product
							key={item.title}
							title={item.title}
							price={item.price}
							onAddToCart={() => handleAddToCart(item.id)}
						/>
					))}
				</Box>
				<Cart itemsInCart={itemsInCart} totalCost={totalCost} />
				{itemsInCart.length > 0 && (
					<StripeProvider apiKey="your_public_key">
						<Elements>
							<CheckoutForm totalCost={totalCost} />
						</Elements>
					</StripeProvider>
				)}
			</Box>
		</Box>
	);
};

export default App;
