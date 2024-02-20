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

export function ParamTable({ params, selectedKeys, setSelectedKeys }) {
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
