const HOST = `http://${process.env.BACKEND_HOST}:5000/`;

export async function POST(request) {
	const res = await fetch(HOST, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(await request.json()),
	});

	const data = await res.json();
	return Response.json(data);
}

export async function GET(request) {
	const res = await fetch(HOST);

	const data = await res.json();
	return Response.json(data);
}
