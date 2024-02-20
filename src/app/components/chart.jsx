import groupBy from 'lodash.groupby';
import { Axis, Grid, LineSeries, XYChart, Tooltip } from '@visx/xychart';

const accessors = {
	xAccessor: (d) => d.x,
	yAccessor: (d) => d.y,
};

export function Chart({ data }) {
	const chartData = groupBy(data, 'g');
	return (
		<XYChart height={300} xScale={{ type: 'band' }} yScale={{ type: 'linear' }}>
			<Axis orientation='bottom' label='Vds(V)' />
			<Axis orientation='left' label='Ids(A)' />
			<Grid columns={false} numTicks={4} />
			{Object.entries(chartData).map(([g, datum]) => (
				<LineSeries key={g} dataKey={`Line ${g}`} data={datum} {...accessors} />
			))}
			<Tooltip
				snapTooltipToDatumX
				snapTooltipToDatumY
				showVerticalCrosshair
				showSeriesGlyphs
				renderTooltip={({ tooltipData, colorScale }) => (
					<div>
						<div style={{ color: colorScale(tooltipData.nearestDatum.key) }}>
							{tooltipData.nearestDatum.key}
						</div>
						{accessors.xAccessor(tooltipData.nearestDatum.datum)}
						{', '}
						{accessors.yAccessor(tooltipData.nearestDatum.datum)}
					</div>
				)}
			/>
		</XYChart>
	);
}
