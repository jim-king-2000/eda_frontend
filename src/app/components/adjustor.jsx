import { Slider, Input, Button } from '@nextui-org/react';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/solid';

export function Adjustor({ name, minValue, maxValue, value, step, onChange }) {
	return (
		<div className='flex flex-col gap-2 p-2 border-small rounded-medium'>
			<div className='self-center'>{name}</div>
			<div className='flex flex-row gap-2 items-center'>
				<Button
					isIconOnly
					size='sm'
					variant='light'
					onPress={() => onChange(value - step)}
				>
					<ChevronLeftIcon />
				</Button>
				<Input
					size='sm'
					type='number'
					variant='underlined'
					value={value}
					onValueChange={onChange}
				/>
				<Button
					isIconOnly
					size='sm'
					variant='light'
					onPress={() => onChange(value + step)}
				>
					<ChevronRightIcon />
				</Button>
			</div>
			<Slider
				aria-label='Parameter Adjustor'
				size='sm'
				hideValue
				step={0.001}
				maxValue={maxValue}
				minValue={minValue}
				value={value}
				onChange={onChange}
				className='px-2'
			/>
		</div>
	);
}
