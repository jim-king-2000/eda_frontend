'use client';

import groupBy from 'lodash.groupby';
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
			<Tabs fullWidth classNames={{ panel: 'flex-1 overflow-auto' }}>
				{Object.entries(params).map(([category, categoryParams]) => (
					<Tab key={category} title={category}>
						<Table
							aria-label='Parameters Table'
							isHeaderSticky
							classNames={{ base: 'h-full' }}
							selectionMode='multiple'
							selectedKeys={selectedKeys}
							onSelectionChange={(selection) =>
								selection === 'all'
									? setSelectedKeys(
											new Set(categoryParams.map(({ name }) => name))
									  )
									: setSelectedKeys(selection)
							}
						>
							<TableHeader>
								<TableColumn>Name</TableColumn>
								<TableColumn>Value</TableColumn>
								<TableColumn>Lower</TableColumn>
								<TableColumn>Upper</TableColumn>
								<TableColumn>Step</TableColumn>
							</TableHeader>
							<TableBody items={categoryParams}>
								{(item) => (
									<TableRow key={item.name}>
										<TableCell>{item.name}</TableCell>
										<TableCell>{item.default}</TableCell>
										<TableCell>{item.soft[0]}</TableCell>
										<TableCell>{item.soft[1]}</TableCell>
										<TableCell>{item.step}</TableCell>
									</TableRow>
								)}
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
				params={groupBy(params, ({ category }) => category)}
				selectedKeys={selectedKeys}
				setSelectedKeys={setSelectedKeys}
			/>
			<ParamAdjustors params={params} selectedKeys={selectedKeys} />
		</div>
	);
}
