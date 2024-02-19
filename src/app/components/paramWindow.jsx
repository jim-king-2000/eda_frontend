'use client';

import { useState } from 'react';
import {
	Tabs,
	Tab,
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
} from '@nextui-org/react';
import { Adjustor } from './adjustor';

function ParamTable({ params, selectedKeys, setSelectedKeys }) {
	return (
		<div className='flex-1 h-full flex flex-col'>
			<Tabs
				fullWidth
				classNames={{ base: 'gap-2', panel: 'flex-1 overflow-auto' }}
			>
				{Object.entries(params.paramClassify).map(([key, value]) => (
					<Tab key={key} title={key}>
						<Table
							isHeaderSticky
							classNames={{ base: 'h-full' }}
							selectionMode='multiple'
							selectedKeys={selectedKeys}
							onSelectionChange={setSelectedKeys}
						>
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
										.reduce((accumulator, currentValue) =>
											Object.assign(accumulator, currentValue)
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
	);
}

function ParamAdjustors({ params, selectedKeys }) {
	console.log(selectedKeys);
	return (
		<div className='pb-2 flex-1'>
			<div
				className='pr-1 h-full overflow-auto'
				style={{
					display: 'grid',
					gridGap: '8px',
					gridAutoRows: 'min-content',
					gridTemplateColumns: 'repeat(auto-fit, minmax(12rem, 1fr))',
				}}
			>
				{selectedKeys.map((key) => (
					<Adjustor
						name={key}
						// value={vth0}
						// onChange={(value) => setVth0(value)}
						minValue={-50}
						maxValue={50}
						step={0.001}
					/>
				))}
			</div>
		</div>
	);
}

export function ParamWindow({ params }) {
	const [selectedKeys, setSelectedKeys] = useState(new Set([]));

	return (
		<div className='flex flex-row gap-2 h-1/3'>
			<ParamTable
				params={params}
				selectedKeys={selectedKeys}
				setSelectedKeys={setSelectedKeys}
			/>
			<ParamAdjustors params={params} selectedKeys={Array.from(selectedKeys)} />
		</div>
	);
}
