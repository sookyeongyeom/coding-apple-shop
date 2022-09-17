/* eslint-disable */

import './App.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useState } from 'react';
import data from './data';
import { Routes, Route, Link } from 'react-router-dom';
import Detail from './pages/Detail';

function App() {
	let [shoes] = useState(data);
	return (
		<div className='App'>
			<Navbar bg='light' variant='light'>
				<Container>
					<Navbar.Brand>ShoeShop</Navbar.Brand>
					<Nav className='me-auto'>
						<Link to='/' className='nav-link'>
							Home
						</Link>
						<Link to='/detail' className='nav-link'>
							Detail
						</Link>
					</Nav>
				</Container>
			</Navbar>

			<Routes>
				<Route
					path='/'
					element={
						<>
							<div className='main-bg'></div>
							<div className='container'>
								<div className='row'>
									{shoes.map((shoe, idx) => {
										return <Shoe shoe={shoe} idx={idx} key={idx} />;
									})}
								</div>
							</div>
						</>
					}
				/>
				<Route path='/detail' element={<Detail />} />
			</Routes>
		</div>
	);
}

function Shoe(props) {
	return (
		<div className='col-md-4'>
			<img src={`https://codingapple1.github.io/shop/shoes${props.idx + 1}.jpg`} width='80%' />
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
