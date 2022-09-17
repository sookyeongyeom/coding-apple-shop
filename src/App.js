/* eslint-disable */

import './App.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useState } from 'react';
import data from './data';

function App() {
	let [shoes] = useState(data);
	return (
		<div className='App'>
			<Navbar bg='light' variant='light'>
				<Container>
					<Navbar.Brand href='#home'>ShoeShop</Navbar.Brand>
					<Nav className='me-auto'>
						<Nav.Link href='#home'>Home</Nav.Link>
						<Nav.Link href='#features'>Cart</Nav.Link>
					</Nav>
				</Container>
			</Navbar>
			<div className='main-bg'></div>
			<div className='container'>
				<div className='row'>
					{data.map((v, i) => {
						return <Shoe shoe={v} index={i} key={i} />;
					})}
				</div>
			</div>
		</div>
	);
}

function Shoe(props) {
	return (
		<div className='col-md-4'>
			<img src={`https://codingapple1.github.io/shop/shoes${props.index + 1}.jpg`} width='80%' />
			<h4>{props.shoe.title}</h4>
			<p>
				{props.shoe.content}
				<br />
				{props.shoe.price}원
			</p>
		</div>
	);
}

export default App;
