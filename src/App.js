/* eslint-disable */

import './App.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { createContext, lazy, Suspense, useState } from 'react';
import data from './data';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
// import Detail from './pages/Detail';
// import Cart from './pages/Cart';
import axios from 'axios';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import PerformanceIssue from './pages/PerformanceIssue';

// lazy로 임포트할시 해당 컴포넌트를 실제로 불러올때 로딩시간이 소요될수있으므로
// Suspense로 해당 컴포넌트를 감싸 전환중 로딩화면을 띄울 수 있음
// 아예 Routes를 감싸버리는게 편함
const Detail = lazy(() => import('./pages/Detail.js'));
const Cart = lazy(() => import('./pages/Cart.js'));

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
	// ********************************************************
	// 로컬스토리지 (로컬스토리지는 따로 브라우저청소시에만 휘발, 세션스토리지는 껐다키면 휘발)
	let obj = { name: 'choco' };
	// 로컬스토리지는 문자열만 잡고 있을 수 있으므로 오브젝트를 넣고 싶으면 JSON(문자열)으로 변환해서 넣어야함
	// JSON은 문자열 취급을 받는다고 생각하면됨
	localStorage.setItem('data', JSON.stringify(obj));
	let out = localStorage.getItem('data');
	// 당연히 문자열인채로 꺼내지기때문에 꺼낸 후 오브젝트로 재파싱해야 정상적으로 사용할 수 있음
	console.log(JSON.parse(out).name);
	// ********************************************************
	let [shoes, setShoes] = useState(data);
	// Context API로 공유원하는 state생성
	let [재고] = useState([10, 11, 12]);
	// 응용1. 버튼 2회 누르면 7,8,9번 상품 가져오기
	let [pageCount, setPageCount] = useState(1);
	let [loading, setLoading] = useState(false);
	let navigate = useNavigate();

	// react-query 장점 (실시간으로 왔다갔다하는 데이터 보여줘야하는 경우 유용함)
	// 장점1. 성공/실패/로딩중 쉽게 파악하고 상태를 사용할 수 있음 (state만들필요X)
	// 장점2. 틈만나면 자동으로 refetch해줌 (시간간격조절가능, 끌수도있음)
	// 장점3. 실패시 retry알아서해줌
	// 장점4. state공유 안해도 됨 (서로 다른 컴포넌트가 같은 곳으로 중복요청보내도 합쳐서 하나만 보내줌)
	// 장점5. ajax결과 캐싱가능 (기존성공결과를 보여준 상태에서 새로운요청보내기때문에 더 빠른느낌이듦)
	let result = useQuery('작명', () => {
		return axios.get('https://codingapple1.github.io/userdata.json').then((a) => {
			console.log('요청됨!');
			return a.data;
		});
	});

	useEffect(() => {
		// watched기록 없으면 초기화해줌
		if (!localStorage.getItem('watched')) localStorage.setItem('watched', JSON.stringify([]));
	}, []);

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
						<Nav.Link onClick={() => navigate('/issue')}>Issue</Nav.Link>
						{/* 
              navigate(-1) 뒤로가기
              navigate(1) 앞으로가기
            */}
					</Nav>
					<Nav className='ms-auto'>
						{/* {result.isLoading ? 'Loading..' : `반가워요 ${result.data.name}님`} */}
						{result.isLoading && 'Loading...'}
						{result.error && 'ERROR ;ㅅ;'}
						{result.data && `반가워요 ${result.data.name}님`}
					</Nav>
				</Container>
			</Navbar>

			<Suspense fallback={<div>로딩중임...</div>}>
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
					<Route path='/issue' element={<PerformanceIssue />} />
					{/* 숙제 */}
					<Route path='/event' element={<Event />}>
						<Route path='one' element={<div>첫 주문시 양배추즙 서비스</div>} />
						<Route path='two' element={<div>생일기념 쿠폰받기</div>} />
					</Route>
					<Route path='*' element={<h4>404페이지</h4>} />
				</Routes>
			</Suspense>
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
