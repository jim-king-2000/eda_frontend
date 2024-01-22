'use client';

import { Button } from '@nextui-org/react';
import { useState } from 'react';
import { Axis, Grid, LineSeries, XYChart, Tooltip } from '@visx/xychart';

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
							dataKey={`Line ${index}`}
							data={datum}
							{...accessors}
						/>
					))}
					<Tooltip
						snapTooltipToDatumX
						snapTooltipToDatumY
						showVerticalCrosshair
						showSeriesGlyphs
						renderTooltip={({ tooltipData, colorScale }) => (
							<div>
								<div
									style={{ color: colorScale(tooltipData.nearestDatum.key) }}
								>
									{tooltipData.nearestDatum.key}
								</div>
								{accessors.xAccessor(tooltipData.nearestDatum.datum)}
								{', '}
								{accessors.yAccessor(tooltipData.nearestDatum.datum)}
							</div>
						)}
					/>
				</XYChart>
			)}
		</div>
	);
}
