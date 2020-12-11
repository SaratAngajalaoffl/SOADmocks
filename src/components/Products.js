import React, { Component, Fragment } from 'react';
import Product from './Product';
import axios from 'axios';
const config = require('../config.json');

export default class Products extends Component {
	state = {
		products: [],
	};

	fetchProducts = () => {
		axios
			.get(`${config.api.invokeUrl}/api/hexalenergy/designs`)
			.then((res) => {
				this.setState({ products: res.data });
			});
	};

	componentDidMount = () => {
		this.fetchProducts();
	};

	render() {
		return (
			<Fragment>
				<section className='section'>
					<div className='container'>
						<h1>Explore Our Merch</h1>
						<p className='subtitle is-5'>
							Show your love to us by buying our high-quality
							merchandise
						</p>
						<br />
						<div className='columns'>
							<div className='column'>
								<div className='tile-out'>
									{this.state.products &&
									this.state.products.length > 0 ? (
										this.state.products.map((product) => (
											<Product
												name={product.title}
												price={product.category.price}
												id={product.id}
												key={product.id}
												image={product.picture}
											/>
										))
									) : (
										<div className='tile notification is-warning'>
											No Merchandise available
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
