import React, { Component } from 'react';
import axios from 'axios';
const config = require('../config.json');

export default class ProductAdmin extends Component {
	HandleClick = () => {
		var csrftoken = '';

		const value = `; ${document.cookie}`;
		const parts = value.split(`; csrftoken=`);

		if (parts.length === 2) csrftoken = parts.pop().split(';').shift();

		axios.get(`${config.api.invokeUrl}/api/config/`).then((result) => {
			console.log('pk is', result.data.publicKey, 'csrf is', csrftoken);

			axios
				.post(
					`${config.api.invokeUrl}/api/place-order/`,
					{
						products: [
							{
								product_id: this.props.id,
								qty: 1,
							},
						],
						address: {
							address_line1: 'Times Square',
							address_line2: 'Satya Castle,Shanti Nagar',
							state: 'Andhra Pradesh',
							city: 'Visakhapatnam',
							country: 'India',
							pincode: '530009',
						},
						success_url: 'http://127.0.0.1:3000/orders',
						cancelled_url: 'http://127.0.0.1:3000/merch',
					},
					{
						headers: {
							'Content-Type': 'application/json',
							'X-CSRFToken': csrftoken,
						},
					}
				)
				.then((response) => {
					var orders = JSON.parse(localStorage.getItem('orders')) || {
						orders: [],
					};
					orders.orders.push(response.data.id);
					localStorage.setItem('orders', JSON.stringify(orders));
					const stripe = window.Stripe(result.data.publicKey);
					return stripe.redirectToCheckout({
						sessionId: response.data.session_id,
					});
				});

			console.log(`Purchasing ${this.props.name}`);
		});
	};

	render() {
		return (
			<div className='box notification is-success'>
				<div className='tile-content'>
					<div className='description'>
						<p className='product-title'>{this.props.name}</p>
						<p className='product-id'>Price: {this.props.price}</p>
						<button id='submitBtn' onClick={this.HandleClick}>
							Buy Now
						</button>
					</div>
					<div className='picture'>
						<img
							src={config.api.invokeUrl + this.props.image}
							alt={this.props.name}
							width='300px'
							height='300px'
						/>
					</div>
				</div>
			</div>
		);
	}
}
