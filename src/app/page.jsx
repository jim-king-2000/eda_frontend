'use client';

import { useState } from 'react';
import { Button } from '@nextui-org/react';
import { Chart } from './components/chart';
import { Adjustor } from './components/adjustor';

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

export default function Page() {
	const [chartData, setChartData] = useState();
	const [vth0, setVth0] = useState(0.5525229271354288);

	return (
		<div className='flex flex-col gap-4 p-4'>
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
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))',
				}}
			>
				{chartData &&
					chartData.map((datum, index) => <Chart key={index} data={datum} />)}
			</div>
		</div>
	);
}
