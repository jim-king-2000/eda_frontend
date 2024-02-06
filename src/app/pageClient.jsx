'use client';

import { useState } from 'react';
import {
	Button,
	Tabs,
	Tab,
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
} from '@nextui-org/react';
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

export function Home({ params }) {
	const [chartData, setChartData] = useState();
	const [vth0, setVth0] = useState(0.5525229271354288);

	return (
		<>
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
				className='flex-1'
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))',
				}}
			>
				{chartData &&
					chartData.map((datum, index) => <Chart key={index} data={datum} />)}
			</div>
			<div>
				<Tabs fullWidth>
					{Object.entries(params.paramClassify).map(([key, value]) => (
						<Tab key={key} title={key}>
							<Table selectionMode='multiple' classNames={{ base: 'h-96' }}>
								<TableHeader>
									<TableColumn>Name</TableColumn>
									<TableColumn>Value</TableColumn>
									<TableColumn>Lower</TableColumn>
									<TableColumn>Upper</TableColumn>
									<TableColumn>Step</TableColumn>
								</TableHeader>
								<TableBody>
									{Object.entries(
										value
											.map((index) => params.defaultParams[index].params)
											.reduce(
												(accumulator, currentValue) =>
													Object.assign(accumulator, currentValue),
												{}
											)
									).map(([paramName, param]) => (
										<TableRow key={paramName}>
											<TableCell>{paramName}</TableCell>
											<TableCell>{param.default}</TableCell>
											<TableCell>{param.soft[0]}</TableCell>
											<TableCell>{param.soft[1]}</TableCell>
											<TableCell>{param.step}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Tab>
					))}
				</Tabs>
			</div>
		</>
	);
}
