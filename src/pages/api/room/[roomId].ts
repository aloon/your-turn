import type { APIRoute } from 'astro';
import { turso } from "../../../turso";

export const PUT: APIRoute = async ({ params, request }) => {
  const { roomId } = params;

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
        sql: "UPDATE room SET name = ?, alter_date = ? WHERE id = ?",
        args: [name, new Date(), roomId]
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

export const POST: APIRoute = async ({ params, request }) => {
  const { roomId } = params;

  try {
    const body = await request.json();
    const names: string[] = body.names;

    if (names && roomId) {
      await turso.execute({
        sql: "DELETE FROM person WHERE room_id=?",
        args: [roomId as string]
      });

      for (const [index, name] of names.entries()) {
        await turso.execute({
          sql: "INSERT INTO person (room_id, name, position) VALUES (?,?,?)",
          args: [roomId as string, name, index + 1]
        });
      }
    } else {
      return new Response(JSON.stringify({ error: 'Names and roomId are required' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    return new Response(JSON.stringify({ roomId, names }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error("Error processing POST request:", error);
    return new Response(JSON.stringify({ error: 'Invalid JSON or database operation failed' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
