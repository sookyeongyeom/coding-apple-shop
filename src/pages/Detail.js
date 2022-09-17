/* eslint-disable */

import { useParams } from 'react-router-dom';
import styled from 'styled-components';

// styled-components
// 장점1. 귀찮게 CSS파일까지 갈 필요없음
// 장점2. 스타일이 다른 js파일로 오염되지않음 (.module.css도 지원하는 기능이긴함)
// 장점3. 페이지 로딩시간 단축

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

function Detail(props) {
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
