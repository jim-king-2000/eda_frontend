import { Home } from './pageClient';

async function getAllParams() {
	const rep = await fetch(`${process.env.FRONTEND_ORIGIN}/api/`);
	return rep.json();
}

export default async function Page() {
	const params = await getAllParams();

	return (
		<div className='h-screen flex flex-col gap-4 p-2'>
			<Home params={params} />
		</div>
	);
}
