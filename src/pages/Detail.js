/* eslint-disable */

import { useParams } from 'react-router-dom';

function Detail(props) {
	let { id } = useParams();
	// 응용문제. 자료의 순서가 변경되면 상세페이지도 고장나는 문제는 어떻게 해결할까요?
	let shoe = props.shoes.find((shoe) => shoe.id === +id);
	// let [shoe] = props.shoes.filter((shoe) => shoe.id === +id);
	return (
		<>
			<div className='container'>
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
