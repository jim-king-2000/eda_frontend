import { Adjustor } from '../adjustor';

export function ParamAdjustorWindow({ params, selectedKeys }) {
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
