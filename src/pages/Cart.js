/* eslint-disable */

import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function Cart() {
	// useSelector = Redux store 가져와줌
	let { user, cart } = useSelector((state) => state);
	// 리턴문에서 하나를 지정해서 꺼내쓸 수도 있음
	let stock = useSelector((state) => state.stock);

	return (
		<div>
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
					{cart.map((item, i) => {
						return (
							<tr key={i}>
								<td>{item.id}</td>
								<td>{item.name}</td>
								<td>{item.count}</td>
								<td>안녕</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
		</div>
	);
}

export default Cart;
