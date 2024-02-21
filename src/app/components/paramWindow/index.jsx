'use client';

import { useState } from 'react';
import { ParamTable } from './paramTable';
import { ParamAdjustorWindow } from './paramAdjustorWindow';

export function ParamWindow({ params }) {
	const [selectedParams, setSelectedParams] = useState([]);

	return (
		<div className='flex flex-row gap-2 h-1/3'>
			<ParamTable
				params={params}
				selectedParams={selectedParams}
				setSelectedParams={setSelectedParams}
			/>
			<ParamAdjustorWindow
				selectedParams={selectedParams}
				setSelectedParams={setSelectedParams}
			/>
		</div>
	);
}
