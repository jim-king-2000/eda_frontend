'use client';

import { useState } from 'react';
import { Chart } from './components/chart';
import { ParamWindow } from './components/paramWindow';

export function Home({ params }) {
	const [chartData, setChartData] = useState([]);

	return (
		<>
			<div
				className='flex-1'
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))',
				}}
			>
				{chartData.map((datum, index) => (
					<Chart key={index} data={datum} />
				))}
			</div>
			<ParamWindow params={params} setChartData={setChartData} />
		</>
	);
}
