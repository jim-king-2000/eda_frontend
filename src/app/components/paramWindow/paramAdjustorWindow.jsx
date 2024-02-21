'use client';

import { useState } from 'react';
import { Adjustor } from '../adjustor';

export function ParamAdjustorWindow({ selectedParams }) {
	// console.log('selectedParams', selectedParams);
	const [params, setParams] = useState({});
	// console.log('params', params);

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
						value={params[param.name] ?? param.default}
						onChange={(value) => {
							console.log(value);
							setParams({
								...params,
								[param.name]: value,
							});
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
