/* eslint-disable */

import './App.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useState } from 'react';
import data from './data';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './pages/Detail';

function App() {
	let [shoes] = useState(data);
	let navigate = useNavigate();
	return (
		<div className='App'>
			<Navbar bg='light' variant='light'>
				<Container>
					<Navbar.Brand>ShoeShop</Navbar.Brand>
					<Nav className='me-auto'>
						<Link to='/' className='nav-link'>
							Home
						</Link>
						<Nav.Link onClick={() => navigate('/detail')}>Detail</Nav.Link>
						{/* 
              navigate(-1) 뒤로가기
              navigate(1) 앞으로가기
            */}
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
				{/* URL Parameter */}
				<Route path='/detail/:id' element={<Detail shoes={shoes} />} />
				{/* Nested Routes */}
				{/* 
          장점1. 좀 더 직관적
          장점2. 상하위 element를 동시에 보여줄 수 있음 (부모라우트에 Outlet으로 자리 만들어줘야함)
        */}
				<Route path='/about' element={<About />}>
					<Route path='member' element={<div>멤버임</div>} />
					<Route path='location' element={<div>위치정보임</div>} />
				</Route>
				{/* 숙제 */}
				<Route path='/event' element={<Event />}>
					<Route path='one' element={<div>첫 주문시 양배추즙 서비스</div>} />
					<Route path='two' element={<div>생일기념 쿠폰받기</div>} />
				</Route>
				<Route path='*' element={<h4>404페이지</h4>} />
			</Routes>
		</div>
	);
}

function About() {
	return (
		<div>
			<h4>회사정보임</h4>
			{/* Nested Route를 보여줄 자리 */}
			<Outlet />
		</div>
	);
}

function Event() {
	return (
		<div>
			<h4>오늘의 이벤트</h4>
			{/* Nested Route를 보여줄 자리 */}
			<Outlet />
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
