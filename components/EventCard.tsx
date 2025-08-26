"use client";
import Link from "next/link";
import { averageKmDiameter, getApproach } from "@/lib/nasa";
import { useMemo } from "react";
import { useNeoStore } from "@/store/neoStore";

export default function EventCard({ neo }: { neo: any }) {
     const avgDiam = useMemo(() => averageKmDiameter(neo), [neo]);
     const approach = useMemo(() => getApproach(neo), [neo]);
     const isHaz = neo.is_potentially_hazardous_asteroid;
     const setSelected = useNeoStore((s) => s.setSelected);
     const selected = useNeoStore((s) => s.selected);

     const checked = !!selected[neo.id];

     return (
          <div className="rounded-2xl border border-white/10 bg-neutral-900 p-4 flex flex-col gap-3">
               <div className="flex items-start justify-between gap-3">
                    <div>
                         <Link
                              href={`/event/${neo.id}`}
                              className="text-lg font-semibold hover:underline"
                         >
                              {neo.name}
                         </Link>
                         <div className="text-xs opacity-80">
                              NEO ID: {neo.id}
                         </div>
                    </div>
                    <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                         <input
                              type="checkbox"
                              className="accent-brand"
                              checked={checked}
                              onChange={(e) =>
                                   setSelected(
                                        {
                                             id: neo.id,
                                             name: neo.name,
                                             isHazardous: isHaz,
                                             avgDiameterKm: avgDiam,
                                             approach,
                                        },
                                        e.target.checked
                                   )
                              }
                         />
                         <span className="text-xs">Select</span>
                    </label>
               </div>

               <div className="flex flex-wrap items-center gap-2">
                    <span
                         className={`text-xs px-2 py-1 rounded-full border ${
                              isHaz
                                   ? "border-red-500/40 text-red-400"
                                   : "border-emerald-500/40 text-emerald-400"
                         }`}
                    >
                         {isHaz ? "Potentially Hazardous" : "Not Hazardous"}
                    </span>
               </div>

               <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div className="p-3 rounded-xl bg-neutral-800/60">
                         <div className="opacity-70">Avg Diameter</div>
                         <div className="font-semibold">
                              {avgDiam ? `${avgDiam.toFixed(3)} km` : "—"}
                         </div>
                    </div>
                    <div className="p-3 rounded-xl bg-neutral-800/60">
                         <div className="opacity-70">Closest Approach</div>
                         <div className="font-semibold">
                              {approach?.date ?? "—"}
                         </div>
                    </div>
                    <div className="p-3 rounded-xl bg-neutral-800/60">
                         <div className="opacity-70">Miss Distance</div>
                         <div className="font-semibold">
                              {approach?.missDistanceKm
                                   ? `${Number(
                                          approach.missDistanceKm
                                     ).toLocaleString()} km`
                                   : "—"}
                         </div>
                    </div>
                    <div className="p-3 rounded-xl bg-neutral-800/60">
                         <div className="opacity-70">Velocity</div>
                         <div className="font-semibold">
                              {approach?.velocityKps
                                   ? `${approach.velocityKps.toFixed(2)} km/s`
                                   : "—"}
                         </div>
                    </div>
               </div>
          </div>
     );
}
