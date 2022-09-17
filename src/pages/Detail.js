/* eslint-disable */

import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

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
	// useEffect 쓰는 이유 (Effect = Side Effect에서 따옴)
	// useEffect안에 있는 코드는 html렌더링이 끝난 후에 동작을 시작하기 때문에
	// 시간이 오래 걸리는 연산의 경우 useEffect안에서 실행하는 것이 좋다
	// 외부에서 실행하면 순서대로 연산이 처리되기 때문에 html리렌더링이 너무 늦어진다
	// Ex. 어려운 연산, 서버에서 데이터 가져오기, 타이머 장착 등
	useEffect(() => {
		// mount, update시 여기 코드 실행됨
		setTimeout(() => {
			setDiscount(false);
		}, 2000);
	});

	let [discount, setDiscount] = useState(true);
	let { id } = useParams();
	// 응용문제. 자료의 순서가 변경되면 상세페이지도 고장나는 문제는 어떻게 해결할까요?
	let shoe = props.shoes.find((shoe) => shoe.id === +id);
	// let [shoe] = props.shoes.filter((shoe) => shoe.id === +id);
	return (
		<>
			<div className='container'>
				{/* <BlackBox>
					<Button bg='lightpink'>버튼</Button>
					<Button bg='gray'>버튼</Button>
				</BlackBox> */}
				{discount ? <div className='alert alert-warning'>2초 이내 구매 시 할인</div> : ''}
				<div className='row'>
					<div className='col-md-6'>
						<img src={`https://codingapple1.github.io/shop/shoes${+id + 1}.jpg`} width='100%' />
					</div>
					<div className='col-md-6'>
						<h4 className='pt-5'>{shoe.title}</h4>
						<p>{shoe.content}</p>
						<p>{shoe.price}원</p>
						<button className='btn btn-danger'>주문하기</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default Detail;
