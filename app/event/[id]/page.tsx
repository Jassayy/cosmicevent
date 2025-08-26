import Link from "next/link";
import { averageKmDiameter, getApproach } from "@/lib/nasa";

async function getNeo(id: string) {
     const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/neo/${id}`,
          { cache: "no-store" }
     );
     if (!res.ok) throw new Error("Failed to fetch");
     return res.json();
}

export default async function NeoDetail({
     params,
}: {
     params: { id: string };
}) {
     const neo = await getNeo(params.id);
     const avgDiam = averageKmDiameter(neo);
     const approach = getApproach(neo);

     return (
          <div className="flex flex-col gap-6">
               <Link href="/" className="underline">
                    ← Back
               </Link>
               <h1 className="text-2xl md:text-3xl font-bold">{neo.name}</h1>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 rounded-2xl bg-neutral-900 border border-white/10">
                         <h3 className="font-semibold mb-2">Overview</h3>
                         <ul className="space-y-1 text-sm">
                              <li>
                                   <span className="opacity-70">ID:</span>{" "}
                                   {neo.id}
                              </li>
                              <li>
                                   <span className="opacity-70">
                                        Potentially Hazardous:
                                   </span>{" "}
                                   {neo.is_potentially_hazardous_asteroid
                                        ? "Yes"
                                        : "No"}
                              </li>
                              <li>
                                   <span className="opacity-70">
                                        Average Diameter:
                                   </span>{" "}
                                   {avgDiam ? `${avgDiam.toFixed(3)} km` : "—"}
                              </li>
                         </ul>
                    </div>
                    <div className="p-4 rounded-2xl bg-neutral-900 border border-white/10">
                         <h3 className="font-semibold mb-2">
                              Closest Approach
                         </h3>
                         {approach ? (
                              <ul className="space-y-1 text-sm">
                                   <li>
                                        <span className="opacity-70">
                                             Date/Time:
                                        </span>{" "}
                                        {approach.date}
                                   </li>
                                   <li>
                                        <span className="opacity-70">
                                             Miss Distance:
                                        </span>{" "}
                                        {Number(
                                             approach.missDistanceKm
                                        ).toLocaleString()}{" "}
                                        km
                                   </li>
                                   <li>
                                        <span className="opacity-70">
                                             Velocity:
                                        </span>{" "}
                                        {approach.velocityKps.toFixed(2)} km/s
                                   </li>
                                   <li>
                                        <span className="opacity-70">
                                             Orbiting Body:
                                        </span>{" "}
                                        {approach.orbitingBody}
                                   </li>
                              </ul>
                         ) : (
                              <div className="text-sm opacity-80">
                                   No close approach data.
                              </div>
                         )}
                    </div>
               </div>

               <div className="p-4 rounded-2xl bg-neutral-900 border border-white/10">
                    <a
                         className="underline"
                         href={neo.nasa_jpl_url}
                         target="_blank"
                         rel="noreferrer"
                    >
                         NASA JPL Page ↗
                    </a>
               </div>
          </div>
     );
}
