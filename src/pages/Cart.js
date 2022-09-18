/* eslint-disable */

import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { increaseAge } from './../store/userSlice';
import { increaseQuantity, removeFromCart, sortCartById } from './../store/cartSlice';
import styled from 'styled-components';
import { memo, useMemo, useState } from 'react';

const Button = styled.button`
	background: ${(props) => props.bg};
	color: ${(props) => (props.bg === 'gray' ? 'white' : 'black')};
	padding: 5px 10px;
	border: none;
	border-radius: 6px;
	line-height: normal;
`;

// memo = 꼭 필요할때만 재렌더링해주세요!
// memo로 재렌더링 오래걸리는 컴포넌트 감싸놓으면 좋음
// memo의 원리 = 전달받은 props가 변할때만 재렌더링해줌
// 즉, 디핑시간이 소요되기때문에 props가 길고 복잡하면 손해일수도 있음
let Child = memo(function () {
	console.log('자식 재렌더링');
	return <div>자식임</div>;
});

function 함수() {
	return '반복문 10억번 돌린 결과';
}

function Cart() {
	// 컴포넌트 첫 렌더링시 1회만 실행해줌 = useEffect랑 똑같네
	// 디펜던시 집어넣을 수 있는 것도 똑같음
	// 뭐가 다르냐면
	// useEffect는 html렌더링이 다 끝난 후 실행되는 반면
	// useMemo는 html렌더링과 같이 실행됨
	// 즉, 실행시점의 차이만 있음!
	let result = useMemo(() => {
		return 함수();
	}, []);

	// useSelector = Redux store 가져와줌
	let { user, cart } = useSelector((state) => state);
	// 리턴문에서 하나를 지정해서 꺼내쓸 수도 있음
	let stock = useSelector((state) => state.stock);
	// store.js에 요청보내는 함수
	let dispatch = useDispatch();

	let [count, setCount] = useState(0);

	return (
		<div>
			{/* 부모 컴포넌트 재렌더링시 자식들도 전부 재렌더링됨 */}
			{/* <Child count={count} />
			<button onClick={() => setCount(count + 1)}>+</button> */}
			<h4 className='alert alert-warning' style={{ margin: 0 }}>
				{user.age}살 {user.name}의 장바구니
				<Button bg='transparent' onClick={() => dispatch(increaseAge())}>
					🍡
				</Button>
			</h4>
			<div style={{ textAlign: 'left', margin: '10px' }}>
				<h6>총 항목 : {cart.length}</h6>
				<Button
					bg='lightblue'
					onClick={() => {
						dispatch(sortCartById());
					}}>
					Id순으로 정렬
				</Button>
			</div>

			<Table>
				<thead>
					<tr>
						<th>#</th>
						<th>상품명</th>
						<th>수량</th>
						<th>변경하기</th>
						<th>삭제하기</th>
					</tr>
				</thead>
				<tbody>
					{/* 숙제. 장바구니 store 만들고 사용하기 */}
					{cart.map((item, i) => {
						return (
							<tr key={i}>
								<td>{item.id}</td>
								<td>{item.name}</td>
								<td>{item.count}</td>
								<td>
									<button
										bg='transparent'
										// dispatch로 감싸서 사용해야함
										// 이 자리에서 실행하는것이 아니라,
										// changeName() 실행해달라고 store.js에게 부탁하는것
										onClick={() => {
											dispatch(increaseQuantity(item.id));
										}}>
										+
									</button>
								</td>
								{/* 응용1. 장바구니 삭제 기능 */}
								<td>
									<button
										bg='transparent'
										onClick={() => {
											dispatch(removeFromCart(item.id));
										}}>
										x
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
		</div>
	);
}

export default Cart;
