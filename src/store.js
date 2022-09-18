import { configureStore, createSlice } from '@reduxjs/toolkit';

// Redux 쓰는 이유
// 컴포넌트간 state공유 편해짐
// Redux store안에 모든걸 넣진 맙시다
// 간단한거 만들때나 컴포넌트 몇개없을때는 props쓰는게 코드가 더 짧음

// state하나를 slice라고 부름
// useState() = createSlice()
let user = createSlice({
	name: 'user',
	initialState: '초코',
});

let stock = createSlice({
	name: 'stock',
	initialState: [10, 11, 12],
});

let cart = createSlice({
	name: 'cart',
	initialState: [
		{ id: 0, name: 'White and Black', count: 2 },
		{ id: 2, name: 'Grey Yordan', count: 1 },
	],
});

export default configureStore({
	reducer: {
		// 중요! 여기에 slice등록해야 사용가능
		user: user.reducer,
		stock: stock.reducer,
		cart: cart.reducer,
	},
});
