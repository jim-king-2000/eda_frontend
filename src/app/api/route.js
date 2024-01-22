export async function POST() {
	const res = await fetch('http://47.102.86.37:5000', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const data = await res.json();
	return Response.json(data);
}
