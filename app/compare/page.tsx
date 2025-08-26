"use client";

import { useNeoStore } from "@/store/neoStore";
import Link from "next/link";
import { useMemo } from "react";
import {
     ResponsiveContainer,
     BarChart,
     Bar,
     XAxis,
     YAxis,
     Tooltip,
     CartesianGrid,
     Legend,
} from "recharts";

export default function ComparePage() {
     const selected = useNeoStore((s) => s.selected);

     const data = useMemo(
          () =>
               Object.values(selected).map((s) => ({
                    name: s.name,
                    diameterKm: s.avgDiameterKm ?? 0,
                    missDistanceKm: s.approach?.missDistanceKm ?? 0,
                    velocityKps: s.approach?.velocityKps ?? 0,
               })),
          [selected]
     );

     return (
          <div className="flex flex-col gap-6">
               <div className="flex items-center justify-between">
                    <h1 className="text-2xl md:text-3xl font-bold">
                         Compare Selected NEOs
                    </h1>
                    <Link href="/" className="underline">
                         Back
                    </Link>
               </div>

               {data.length === 0 ? (
                    <div className="p-6 rounded-xl border border-white/10 bg-neutral-900">
                         Select items on the home page to compare.
                    </div>
               ) : (
                    <div className="grid grid-cols-1 gap-6">
                         <section className="p-4 rounded-2xl bg-neutral-900 border border-white/10">
                              <h3 className="font-semibold mb-3">
                                   Miss Distance (km)
                              </h3>
                              <div className="h-80">
                                   <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                   >
                                        <BarChart data={data}>
                                             <CartesianGrid strokeDasharray="3 3" />
                                             <XAxis
                                                  dataKey="name"
                                                  hide={false}
                                                  interval={0}
                                                  angle={-20}
                                                  textAnchor="end"
                                                  height={60}
                                             />
                                             <YAxis />
                                             <Tooltip />
                                             <Legend />
                                             <Bar
                                                  dataKey="missDistanceKm"
                                                  name="Miss Distance (km)"
                                             />
                                        </BarChart>
                                   </ResponsiveContainer>
                              </div>
                         </section>

                         <section className="p-4 rounded-2xl bg-neutral-900 border border-white/10">
                              <h3 className="font-semibold mb-3">
                                   Velocity (km/s)
                              </h3>
                              <div className="h-80">
                                   <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                   >
                                        <BarChart data={data}>
                                             <CartesianGrid strokeDasharray="3 3" />
                                             <XAxis
                                                  dataKey="name"
                                                  hide={false}
                                                  interval={0}
                                                  angle={-20}
                                                  textAnchor="end"
                                                  height={60}
                                             />
                                             <YAxis />
                                             <Tooltip />
                                             <Legend />
                                             <Bar
                                                  dataKey="velocityKps"
                                                  name="Velocity (km/s)"
                                             />
                                        </BarChart>
                                   </ResponsiveContainer>
                              </div>
                         </section>

                         <section className="p-4 rounded-2xl bg-neutral-900 border border-white/10">
                              <h3 className="font-semibold mb-3">
                                   Avg Diameter (km)
                              </h3>
                              <div className="h-80">
                                   <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                   >
                                        <BarChart data={data}>
                                             <CartesianGrid strokeDasharray="3 3" />
                                             <XAxis
                                                  dataKey="name"
                                                  hide={false}
                                                  interval={0}
                                                  angle={-20}
                                                  textAnchor="end"
                                                  height={60}
                                             />
                                             <YAxis />
                                             <Tooltip />
                                             <Legend />
                                             <Bar
                                                  dataKey="diameterKm"
                                                  name="Avg Diameter (km)"
                                             />
                                        </BarChart>
                                   </ResponsiveContainer>
                              </div>
                         </section>
                    </div>
               )}
          </div>
     );
}
