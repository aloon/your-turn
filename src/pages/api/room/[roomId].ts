import type { APIRoute } from 'astro';
import { turso } from "../../../turso";

export const PUT: APIRoute = async ({ params, request }) => {
  const { roomId } = params;

  if (request.method !== 'PUT') {
    return new Response(JSON.stringify({ error: 'Only PUT requests are allowed' }), {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    const body = await request.json();
    const { name } = body;

    if (!name) {
      return new Response(JSON.stringify({ error: 'Name is required' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    turso.execute({
        sql: "UPDATE Room SET name = ? WHERE id = ?",
        args: [name, roomId],
      });
    
    return new Response(JSON.stringify({ roomId, name }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};