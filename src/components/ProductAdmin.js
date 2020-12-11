import React, { Component, Fragment } from 'react';
import Order from './Order';
import axios from 'axios';
const config = require('../config.json');

export default class ProductAdmin extends Component {
	state = {
		orders: [],
	};

	fetchOrder = () => {
		var orders = JSON.parse(localStorage.getItem('orders')) || {
			orders: [],
		};
		orders.orders.forEach((orderid) => {
			axios
				.get(`${config.api.invokeUrl}/api/orders/${orderid}`)
				.then((res) => {
					if (res.status === 200) {
						this.setState({
							orders: [...this.state.orders, res.data],
						});
					}
				});
		});
	};

	componentDidMount = () => {
		this.fetchOrder();
	};

	render() {
		return (
			<Fragment>
				<section className='section'>
					<div className='container'>
						<h1>Orders</h1>
						<p className='subtitle is-5'>
							View All Your Orders Below
						</p>
						<br />
						<div className='columns'>
							<div className='column is-one-third'></div>
						</div>
						<div className='columns'>
							<div className='column'>
								<div className='tile-out'>
									{this.state.orders &&
									this.state.orders.length > 0 ? (
										this.state.orders.map((order) => (
											<div>
												<Order
													name={
														order.products[0].title
													}
													price={
														order.products[0]
															.category.price
													}
													status={order.status}
													id={order.id}
													key={order.id}
													image={
														order.products[0]
															.picture
													}
												/>
											</div>
										))
									) : (
										<div className='tile notification is-warning'>
											No Orders available
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</section>
			</Fragment>
		);
	}
}
