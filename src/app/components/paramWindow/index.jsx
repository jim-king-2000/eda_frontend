'use client';

import { Button } from '@nextui-org/react';
import { useState } from 'react';
import { ParamTable } from './paramTable';
import { ParamAdjustorWindow } from './paramAdjustorWindow';

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

export function ParamWindow({ params, setChartData }) {
	const [selectedParams, setSelectedParams] = useState([]);

	return (
		<div className='flex flex-col h-1/2 gap-2'>
			<Button
				className='flex-none'
				onPress={async () =>
					setChartData(
						await ngspice(
							selectedParams.reduce(
								(accumulator, param) =>
									Object.assign(accumulator, {
										[param.name]: param.value ?? param.default,
									}),
								{}
							)
						)
					)
				}
			>
				Simulate
			</Button>
			<div className='flex-1 flex flex-row gap-2 min-h-0'>
				<ParamTable
					params={params}
					selectedParams={selectedParams}
					setSelectedParams={setSelectedParams}
				/>
				<ParamAdjustorWindow
					selectedParams={selectedParams}
					setSelectedParams={setSelectedParams}
				/>
			</div>
		</div>
	);
}
