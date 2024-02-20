const HOST = `http://${process.env.BACKEND_HOST}/`;

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

export async function GET() {
	const res = await fetch(HOST + 'v2');
	const data = await res.json();
	return Response.json(data);
}
