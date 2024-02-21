import { Adjustor } from '../adjustor';

export function ParamAdjustorWindow({ selectedParams, setSelectedParams }) {
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
				{selectedParams.map((param, index) => (
					<Adjustor
						key={param.name}
						name={param.name}
						value={param.value ?? param.default}
						onChange={(value) => {
							const updatedParams = [...selectedParams];
							updatedParams[index]['value'] = value;
							setSelectedParams(updatedParams);
						}}
						minValue={param.soft[0]}
						maxValue={param.soft[1]}
						step={param.step}
					/>
				))}
			</div>
		</div>
	);
}
