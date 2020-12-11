import React, { Component } from 'react';
const config = require('../config.json');

export default class ProductAdmin extends Component {
	render() {
		return (
			<div className='box notification is-success'>
				<div className='tile-content'>
					<div className='description'>
						<p className='product-title'>{this.props.name}</p>
						<p className='product-id'>Price: {this.props.price}</p>
						<p className='product-id'>
							Status: {this.props.status}
						</p>
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
