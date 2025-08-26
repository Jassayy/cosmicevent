import { error } from "console";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
     const { searchParams } = new URL(req.url);
     const start_date = searchParams.get("start_date");
     const end_date = searchParams.get("end_date");

     if (!start_date || !end_date) {
          return new Response(
               JSON.stringify({ error: "Start and End date is required" }),
               {
                    status: 400,
               }
          );
     }

     const key = process.env.NASA_API_KEY;
     const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${start_date}&end_date=${end_date}&api_key=${key}`;

     try {
          const res = await fetch(url, { next: { revalidate: 3600 } });

          if (!res.ok) {
               throw new Error(`NASA API Error : r${res.status}`);
          }

          const data = await res.json();
          return Response.json(data);
     } catch (e: any) {
          return new Response(JSON.stringify({ error: e.message }), {
               status: 500,
          });
     }
}
