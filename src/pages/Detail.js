/* eslint-disable */

import { useContext, useState } from 'react';
import { useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Context1 } from './../App';
import { addToCart } from './../store/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

// styled-components
// 장점1. 귀찮게 CSS파일까지 갈 필요없음
// 장점2. 스타일이 다른 js파일로 오염되지않음 (.module.css도 지원하는 기능이긴함)
// 장점3. 페이지 로딩시간 단축
// 단점1. JS파일이 매우 복잡해짐 (이게 일반 컴포넌트인지 styled인지 구분 힘듦)
// 단점2. JS파일 간 중복 디자인이 많이 필요하다면 export/import 해줘야함==일반 CSS랑 차이없음
// 단점3. CSS담당이 styled-components 문법을 모른다면...? (웹디자이너와의 협업 힘듦)

const Button = styled.button`
	background: ${(props) => props.bg};
	color: ${(props) => (props.bg === 'gray' ? 'white' : 'black')};
	padding: 5px 10px;
	border: none;
	border-radius: 6px;
	margin: 10px;
`;

const BlackBox = styled.div`
	background-color: black;
	color: white;
	padding: 20px;
`;

const NumInputBox = styled.input`
	display: block;
	width: 40%;
	height: 50px;
	border: 4px solid #dc3545;
	margin: 0 auto;

	&:focus {
		outline: none;
	}
`;

const NotNumAlert = styled.div`
	width: 60%;
	height: 50px;
	line-height: 50px;
	font-size: 28px;
	background-color: #dc3545;
	color: #fff;
	margin: 0 auto;
	margin-bottom: 30px;
	overflow: hidden;
`;

// 옛날 방식
// class Detail2 extends React.Component {
//   componentDidMount() {
//     // mount
//   }
//   componentDidUpdate() {
//     // update
//   }
//   componentWillUnmount() {
//     // unmount
//   }
// }

function Detail(props) {
	// store.js에 요청보내는 함수
	let dispatch = useDispatch();

	// 보관함 해체
	let { 재고 } = useContext(Context1);
	let [discount, setDiscount] = useState(true);
	let [count, setCount] = useState(0);
	let [count2, setCount2] = useState(0);
	let [num, setNum] = useState(0);
	let [notNumAlert, setNotNumAlert] = useState(false);
	let [activeTab, setActiveTab] = useState(0);
	let [fadePage, setFadePage] = useState('');
	let { id } = useParams();
	// 응용문제. 자료의 순서가 변경되면 상세페이지도 고장나는 문제는 어떻게 해결할까요?
	let shoe = props.shoes.find((shoe) => shoe.id === +id);
	// let [shoe] = props.shoes.filter((shoe) => shoe.id === +id);

	// useEffect 쓰는 이유 (Effect = Side Effect에서 따옴)
	// useEffect안에 있는 코드는 html렌더링이 끝난 후에 동작을 시작하기 때문에
	// 시간이 오래 걸리는 연산의 경우 useEffect안에서 실행하는 것이 좋다
	// 외부에서 실행하면 순서대로 연산이 처리되기 때문에 html리렌더링이 너무 늦어진다
	// Ex. 어려운 연산, 서버에서 데이터 가져오기, 타이머 장착 등
	useEffect(() => {
		// mount시 || 디펜던시 update시 여기 코드 실행됨
		const timer = setTimeout(() => {
			setDiscount(false);
		}, 2000);
		console.log('mount');

		// 숙제. 유저가 숫자 말고 다른걸 입력하면 경고메세지 출력하기
		if (isNaN(num)) setNotNumAlert(true);
		else setNotNumAlert(false);

		return () => {
			// useEffect 동작 전에 실행되는 부분 = clean-up function으로 사용
			// mount시 실행안됨, unmount시에는 실행됨
			// 디펜던시 update시 먼저 실행되는 부분
			// Ex. 기존 타이머 제거, 기존 데이터 요청 제거
			console.log('clean-up');
			clearTimeout(timer);
		};
	}, [num]);
	// useEffect 디펜던시에 대해
	// 파라미터 생략하면 = mount시 + 어떤 state update라도 무조건 실행
	// [] = mount시에만 실행 + 어떤 state update에도 실행되지 않음
	// [count] = mount시 + count update시에만 실행

	useEffect(() => {
		// DetailPage mount시 end 부착하여 fade효과 주기
		setFadePage('end');
		// ********************************************************
		// 상세페이지 방문시 로컬스토리지에 상품id 저장
		let watched = JSON.parse(localStorage.getItem('watched'));
		// 중복 제거 (최근 기록 갱신 안됨)
		// watched.push(id);
		// const watchedSet = Array.from(new Set(watched));
		// 최근 기록으로 갱신
		watched = watched.filter((data) => data != id);
		watched.push(+id);
		localStorage.setItem('watched', JSON.stringify(watched));
		// ********************************************************
		return () => {
			// 디펜던시 없으므로, unmount시에만 동작
			setFadePage('');
		};
	}, []);

	return (
		<div className={`start ${fadePage}`}>
			<div className='container'>
				{/* <BlackBox>
					<Button bg='lightpink'>버튼</Button>
					<Button bg='gray'>버튼</Button>
				</BlackBox> */}
				{/* {count}{' '}
				<Button bg='lightblue' onClick={() => setCount(count + 1)}>
					+1
				</Button>
				<br />
				{count2}{' '}
				<Button bg='lightpink' onClick={() => setCount2(count2 + 1)}>
					+1
				</Button> */}
				{/* 리액트적 사고방식 = 엘리먼트를 직접 조작하는게 아니라 스위치 달아놓고 스위치를 조작! */}
				{discount ? (
					<div className='alert alert-warning' style={{ marginTop: '20px' }}>
						2초 이내 구매 시 할인
					</div>
				) : null}
				<div className='row'>
					<div className='col-md-6'>
						<img src={`https://codingapple1.github.io/shop/shoes${+id + 1}.jpg`} width='100%' />
					</div>
					{/* 숙제. 유저가 숫자 말고 다른걸 입력하면 경고메세지 출력하기 */}
					{/* <div className='col-md-6'>
						{notNumAlert ? <NotNumAlert>경고 : 숫자만 입력하세요</NotNumAlert> : null}
						<NumInputBox onChange={(e) => setNum(e.target.value)} />
					</div> */}
					<div className='col-md-6'>
						<h4 className='pt-5'>{shoe.title}</h4>
						<p>{shoe.content}</p>
						<p>{shoe.price}원</p>
						<button className='btn btn-danger' onClick={() => dispatch(addToCart(shoe))}>
							주문하기
						</button>
					</div>
				</div>
				<Nav variant='tabs' defaultActiveKey='link0' style={{ marginTop: '20px' }}>
					<Nav.Item>
						<Nav.Link eventKey='link0' onClick={() => setActiveTab(0)}>
							버튼0
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link eventKey='link1' onClick={() => setActiveTab(1)}>
							버튼1
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link eventKey='link2' onClick={() => setActiveTab(2)}>
							버튼2
						</Nav.Link>
					</Nav.Item>
				</Nav>
				{/* {activeTab === 0 ? <div>내용0</div> : null}
				{activeTab === 1 ? <div>내용1</div> : null}
				{activeTab === 2 ? <div>내용2</div> : null} */}
				<TabContent activeTab={activeTab} />
			</div>
		</div>
	);
}

// 팁1. 파라미터에서 props destructuring
function TabContent({ activeTab }) {
	// 보관함 해체 = 자손 컴포넌트에서도 props전달없이 보관함 해체해서 갖다쓸수있음
	let { 재고 } = useContext(Context1);
	let [fade, setFade] = useState('');
	// activeTab state가 변할 때 end 탈부착
	// react automatic batching(state 한번에 변경)때문에 같은 함수내에서 시간차 줄 수 없음
	// 따라서 타이머를 사용해야함
	useEffect(() => {
		let timer = setTimeout(() => {
			setFade('end');
		}, 10);
		return () => {
			clearTimeout(timer);
			setFade('');
		};
	}, [activeTab]);
	// if (activeTab === 0) {
	// 	return <div>내용0</div>;
	// } else if (activeTab === 1) {
	// 	return <div>내용1</div>;
	// } else if (activeTab === 2) {
	// 	return <div>내용2</div>;
	// }
	// 팁2. 센스좋으면 if 필요없을수도
	// 이렇게 리팩하면 훨씬 간단해짐 ㄷㄷ
	return (
		<div className={`start ${fade}`}>
			{[<div>{재고[0]}</div>, <div>내용1</div>, <div>내용2</div>][activeTab]}
		</div>
	);
}

export default Detail;
