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

export function ParamWindow({ params }) {
	const [selectedKeys, setSelectedKeys] = useState(new Set([]));

	return (
		<div>
			<Tabs fullWidth>
				{Object.entries(params.paramClassify).map(([key, value]) => (
					<Tab key={key} title={key}>
						<Table
							selectionMode='multiple'
							selectedKeys={selectedKeys}
							onSelectionChange={setSelectedKeys}
							classNames={{ base: 'h-96' }}
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
