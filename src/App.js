/* eslint-disable */

import './App.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { createContext, useState } from 'react';
import data from './data';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './pages/Detail';
import Cart from './pages/Cart';
import axios from 'axios';
import styled from 'styled-components';

const Button = styled.button`
	background: ${(props) => props.bg};
	color: ${(props) => (props.bg === 'gray' ? 'white' : 'black')};
	padding: 5px 10px;
	border: none;
	border-radius: 6px;
	margin: 10px;
`;

// Context API = props없이 state사용가능하게 해주는 리액트기본문법
// Context = state 보관함
// export로 내보내야 다른 곳에서 import가능
export let Context1 = createContext();
// Contect API 단점
// 단점1. state변경시 쓸데없는것까지 재렌더링 = 성능이슈
// 단점2. 나중에 컴포넌트 재사용이 어려움 = TabContent를 다른 부모가 갖다쓰면 Context1없다고 오류날수있음
// 따라서 보통 외부 라이브러리(리덕스)를 사용함

function App() {
	let [shoes, setShoes] = useState(data);
	// Context API로 공유원하는 state생성
	let [재고] = useState([10, 11, 12]);
	// 응용1. 버튼 2회 누르면 7,8,9번 상품 가져오기
	let [pageCount, setPageCount] = useState(1);
	let [loading, setLoading] = useState(false);
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
						<Nav.Link onClick={() => navigate('/cart')}>Cart</Nav.Link>
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
							{/* 응용3. 버튼 누르면 로딩중 안내 띄우기 */}
							{loading ? (
								<h4 className='alert alert-warning' style={{ margin: '0 auto', width: '30%' }}>
									로딩중이에영 ;ㅅ;
								</h4>
							) : null}
							{/* 응용2. 버튼 3회 누르면 상품 더 없다고 알려주기 */}
							{pageCount < 3 ? (
								<Button
									bg='lightpink'
									onClick={() => {
										// 로딩중 안내 ON
										setLoading(true);
										// ********************************************************
										// axios = ajax요청 쉽게 해주는 라이브러리
										axios
											.get(`https://codingapple1.github.io/shop/data${pageCount + 1}.json`) //
											.then((결과) => {
												// axios는 array나 object를 알아서 json으로 변환해줌
												const moreShoes = 결과.data;
												// 신발 더보기
												let copy = [...shoes, ...moreShoes];
												setShoes(copy);
												// 더보기 요청횟수 기록
												// 응용1. 버튼 2회 누르면 7,8,9번 상품 가져오기
												setPageCount(pageCount + 1);
												// 로딩중 안내 OFF
												setLoading(false);
											})
											.catch(() => {
												console.log('실패함ㅠㅠ');
												// 로딩중 안내 OFF
												setLoading(false);
											});
										// ********************************************************
										// fetch를 쓰는 경우 = 직접 json으로 변환해줘야함
										// fetch('/url0')
										// 	.then((결과) => 결과.json())
										// 	.then((data) => {});
										// ********************************************************
										// 다수의 요청이 모두 완료된 후 어떤 동작을 실행하려면
										// Promise.all([axios.get('/url1'), axios.get('/url2')]) //
										// 	.then(() => {
										// 		//실행 원하는 동작은 여기
										// 	});
									}}>
									더보기
								</Button>
							) : (
								<div className='alert alert-danger' style={{ margin: 0 }}>
									상품 더 없어요!
								</div>
							)}
						</>
					}
				/>
				{/* URL Parameter */}

				<Route
					path='/detail/:id'
					element={
						// <Context이름.Provider>로 state공유를 원하는 컴포넌트 감싸기
						<Context1.Provider value={{ 재고 }}>
							<Detail shoes={shoes} />
						</Context1.Provider>
					}
				/>

				{/* Nested Routes */}
				{/* 
          장점1. 좀 더 직관적
          장점2. 상하위 element를 동시에 보여줄 수 있음 (부모라우트에 Outlet으로 자리 만들어줘야함)
        */}
				<Route path='/about' element={<About />}>
					<Route path='member' element={<div>멤버임</div>} />
					<Route path='location' element={<div>위치정보임</div>} />
				</Route>
				<Route path='/cart' element={<Cart />} />
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
			<Link to={`/detail/${props.shoe.id}`}>
				<img src={`https://codingapple1.github.io/shop/shoes${props.idx + 1}.jpg`} width='80%' />
			</Link>
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
