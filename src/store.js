import { configureStore } from '@reduxjs/toolkit';
import user from './store/userSlice';
import cart from './store/cartSlice';

// Redux 쓰는 이유
// 컴포넌트간 state공유 편해짐
// Redux store안에 모든걸 넣진 맙시다
// 간단한거 만들때나 컴포넌트 몇개없을때는 props쓰는게 코드가 더 짧음

// let stock = createSlice({
// 	name: 'stock',
// 	initialState: [10, 11, 12],
// });

export default configureStore({
	reducer: {
		// 중요! 여기에 slice등록해야 사용가능
		// stock: stock.reducer,
		user: user.reducer,
		cart: cart.reducer,
	},
});
