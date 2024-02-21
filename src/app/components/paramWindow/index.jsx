'use client';

import groupBy from 'lodash.groupby';
import { useState } from 'react';
import { ParamTable } from './paramTable';
import { ParamAdjustorWindow } from './paramAdjustorWindow';

export function ParamWindow({ params }) {
	const [selectedKeys, setSelectedKeys] = useState(new Set([]));

	return (
		<div className='flex flex-row gap-2 h-1/3'>
			<ParamTable
				params={groupBy(params, ({ category }) => category)}
				selectedKeys={selectedKeys}
				setSelectedKeys={setSelectedKeys}
			/>
			<ParamAdjustorWindow
				selectedParams={params.filter(({ name }) => selectedKeys.has(name))}
			/>
		</div>
	);
}
