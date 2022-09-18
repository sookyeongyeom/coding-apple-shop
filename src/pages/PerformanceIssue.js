import { useDeferredValue, useState, useTransition } from 'react';

// useTransition || useDeferredValue를 이용한 컴포넌트 성능 개선
// 일종의 카드빚 돌려막기

let arr = Array(50000).fill(0);

function PerformanceIssue() {
	let [name, setName] = useState();
	let [isPending, startTransition] = useTransition();
	let state = useDeferredValue(name); // 파라미터로 넘긴 값이 변경될 때 처리시점을 늦춰줌
	return (
		<div>
			<input
				onChange={(e) => {
					// 처리시점을 늦춰줌
					startTransition(() => {
						setName(e.target.value);
					});
				}}
			/>
			{arr.map(() => {
				return <div>{state}</div>;
			})}
		</div>
	);
}

export default PerformanceIssue;
