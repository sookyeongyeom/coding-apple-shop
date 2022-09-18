import { createSlice } from '@reduxjs/toolkit';

// state하나를 slice라고 부름
// useState() = createSlice()
let user = createSlice({
	name: 'user',
	initialState: { name: '초코', age: 25 },
	reducers: {
		// 함수 파라미터에 state적으면 이전 state참조가능
		changeName(state) {
			// array/object의 경우 직접 수정해도 state변경됨 (Immer.js도움)
			// 그래서 문자하나만 필요해도 일부러 {}안에 담기도 함
			// 결론 = state가 array/object면 return없이 직접 수정해도 됩니다
			state.name = '곰곰';
			// return { name: '곰곰', age: 26 };
		},
		increaseAge(state) {
			state.age++;
		},
	},
});
// state 수정을 store가 담당하는 것의 이점
// 모든 컴포넌트들이 state를 수정해버리면 문제가 생겼을 때
// 어디서 문제가 생겼는지 추적하기가 매우 어려움
// 반면 모든 실행을 store가 담당하게 하면
// 범인찾을때 store만 뒤지면 됨 (디버깅 쉬움)

// 함수 밖으로 빼서 export
export let { changeName, increaseAge } = user.actions;

export default user;
