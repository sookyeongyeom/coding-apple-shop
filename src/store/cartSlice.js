import { createSlice } from '@reduxjs/toolkit';

// 숙제. 장바구니 store 만들고 사용하기
let cart = createSlice({
	name: 'cart',
	initialState: [
		{ id: 0, name: 'White and Black', count: 2 },
		{ id: 2, name: 'Grey Yordan', count: 1 },
	],
	// 숙제. 변경버튼 누르면 수량 +1 && sort해도 인덱스 안꼬이게
	reducers: {
		// 파라미터에는 페이로드뿐만 아니라 여러가지 정보가 함께 들어있기때문에
		// 보통 action이라고 작명함
		// action == state변경함수
		increaseQuantity(state, action) {
			// 파라미터를 사용하려면 payload를 꺼내써야함
			// id를 대조하여 타겟을 찾은 후 인덱스 반환
			let target = state.findIndex((item) => item.id === action.payload);
			console.log(target);
			// 해당 인덱스로 접근하여 count++
			state[target].count++;
		},
		// 숙제. 장바구니 추가
		addToCart(state, action) {
			// 중복 상품 예외처리
			if (state.find((item) => item.id === action.payload.id)) {
				return console.log('이미 추가된 상품입니다.');
			}
			const newItem = { id: action.payload.id, name: action.payload.title, count: 0 };
			console.log(newItem);
			// 가리키고 있는 객체의 내용물 자체를 바꿔줘야 반영됨
			state.push(newItem);
			// 아래처럼 다른 주소로 재대입하면 안됨
			// state = [...state, newItem];
			console.log('장바구니에 추가되었습니다.');
		},
		// ID기준 오름차순 정렬
		sortCartById(state) {
			// 리턴식이 참이면 자리바뀜 = 큰게 뒤로감 = 오름차순
			state.sort((a, b) => a.id - b.id);
		},
	},
});

export let { increaseQuantity, addToCart, sortCartById } = cart.actions;

export default cart;
