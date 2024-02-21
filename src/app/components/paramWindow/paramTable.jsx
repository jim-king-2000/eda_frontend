import groupBy from 'lodash.groupby';
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

export function ParamTable({ params, selectedParams, setSelectedParams }) {
	return (
		<div className='h-full flex flex-col'>
			<Tabs fullWidth classNames={{ panel: 'flex-1 overflow-auto' }}>
				{Object.entries(groupBy(params, ({ category }) => category)).map(
					([category, categoryParams]) => (
						<Tab key={category} title={category}>
							<Table
								isHeaderSticky
								aria-label='Parameters Table'
								disabledKeys={categoryParams
									.filter(({ soft }) => soft[0] === soft[1])
									.map(({ name }) => name)}
								classNames={{ base: 'h-full' }}
								selectionMode='multiple'
								selectedKeys={selectedParams.map(({ name }) => name)}
								onSelectionChange={(selection) =>
									selection === 'all'
										? setSelectedParams(
												Array.from(
													new Set([...selectedParams, ...categoryParams])
												)
										  )
										: setSelectedParams(
												params.filter(({ name }) => selection.has(name))
										  )
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
					)
				)}
			</Tabs>
		</div>
	);
}
