export async function POST(request) {
	const res = await fetch(`http://${process.env.BACKEND_HOST}:5000/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const data = await res.json();
	return Response.json(data);
}
