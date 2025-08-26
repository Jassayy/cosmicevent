import { NextRequest } from "next/server";

export async function GET(
     _: NextRequest,
     { params }: { params: { id: string } }
) {
     const key = process.env.NASA_API_KEY ?? "DEMO_KEY";
     const url = `https://api.nasa.gov/neo/rest/v1/neo/${params.id}?api_key=${key}`;
     try {
          const res = await fetch(url, { next: { revalidate: 3600 } });
          if (!res.ok) throw new Error(`NASA API error ${res.status}`);
          const data = await res.json();
          return Response.json(data);
     } catch (e: any) {
          return new Response(JSON.stringify({ error: e.message }), {
               status: 500,
          });
     }
}
