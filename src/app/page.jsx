'use client';

import { Button } from '@nextui-org/react';
import { useState } from 'react';
import { Axis, Grid, LineSeries, XYChart } from '@visx/xychart';

async function ngspice(setChartData) {
	const res = await fetch('/api', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	setChartData(await res.json());
}

const accessors = {
	xAccessor: (d) => d.x,
	yAccessor: (d) => d.y,
};

export default function Page() {
	const [chartData, setChartData] = useState();
	console.log(chartData);
	return (
		<div>
			<Button onPress={() => ngspice(setChartData)}>Press me</Button>
			{chartData && (
				<XYChart
					height={300}
					xScale={{ type: 'band' }}
					yScale={{ type: 'linear' }}
				>
					<Axis orientation='bottom' />
					<Axis orientation='left' />
					<Grid columns={false} numTicks={4} />
					{chartData.map((datum, index) => (
						<LineSeries
							key={index}
							dataKey='Line 1'
							data={datum}
							{...accessors}
						/>
					))}
				</XYChart>
			)}
		</div>
	);
}
