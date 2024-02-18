'use client';

import { useState } from 'react';
import { Button } from '@nextui-org/react';
import { Chart } from './components/chart';
import { Adjustor } from './components/adjustor';
import { ParamWindow } from './components/paramWindow';

async function ngspice(params) {
	const res = await fetch('/api', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(params),
	});
	return res.json();
}

export function Home({ params }) {
	const [chartData, setChartData] = useState();
	const [vth0, setVth0] = useState(0.5525229271354288);

	return (
		<>
			<div>
				<Button onPress={async () => setChartData(await ngspice({ vth0 }))}>
					Simulate
				</Button>
				<Adjustor
					name='Vth0'
					value={vth0}
					onChange={(value) => setVth0(value)}
					minValue={-50}
					maxValue={50}
					step={0.001}
				/>
			</div>
			<div
				className='flex-1'
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))',
				}}
			>
				{chartData &&
					chartData.map((datum, index) => <Chart key={index} data={datum} />)}
			</div>
			<ParamWindow params={params} />
		</>
	);
}
