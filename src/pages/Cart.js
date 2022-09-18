/* eslint-disable */

import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { increaseAge } from './../store/userSlice';
import { increaseQuantity, sortCartById } from './../store/cartSlice';
import styled from 'styled-components';

const Button = styled.button`
	background: ${(props) => props.bg};
	color: ${(props) => (props.bg === 'gray' ? 'white' : 'black')};
	padding: 5px 10px;
	border: none;
	border-radius: 6px;
	line-height: normal;
`;

function Cart() {
	// useSelector = Redux store 가져와줌
	let { user, cart } = useSelector((state) => state);
	// 리턴문에서 하나를 지정해서 꺼내쓸 수도 있음
	let stock = useSelector((state) => state.stock);
	// store.js에 요청보내는 함수
	let dispatch = useDispatch();

	return (
		<div>
			<h4 className='alert alert-warning' style={{ margin: 0 }}>
				{user.age}살 {user.name}의 장바구니
				<Button bg='transparent' onClick={() => dispatch(increaseAge())}>
					🍡
				</Button>
			</h4>
			<div style={{ textAlign: 'left', margin: '10px' }}>
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
									<Button
										bg='transparent'
										// dispatch로 감싸서 사용해야함
										// 이 자리에서 실행하는것이 아니라,
										// changeName() 실행해달라고 store.js에게 부탁하는것
										onClick={() => {
											dispatch(increaseQuantity(item.id));
										}}>
										💛
									</Button>
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
