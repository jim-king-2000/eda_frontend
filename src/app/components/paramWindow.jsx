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
		<div className='h-full flex flex-col'>
			<Tabs
				fullWidth
				classNames={{ base: 'gap-2', panel: 'flex-1 overflow-auto' }}
			>
				{Object.entries(params).map(([category, categoryParams]) => (
					<Tab key={category} title={category}>
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
								{categoryParams.map((param) => (
									<TableRow key={param.name}>
										<TableCell>{param.name}</TableCell>
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
	const selectedParams = params.filter(({ name }) => selectedKeys.has(name));

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
				{selectedParams.map((param) => (
					<Adjustor
						key={param.name}
						name={param.name}
						value={param.default}
						// onChange={(value) => setVth0(value)}
						minValue={param.soft[0]}
						maxValue={param.soft[1]}
						step={param.setp}
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
				params={Object.groupBy(params, ({ category }) => category)}
				selectedKeys={selectedKeys}
				setSelectedKeys={setSelectedKeys}
			/>
			<ParamAdjustors params={params} selectedKeys={selectedKeys} />
		</div>
	);
}
