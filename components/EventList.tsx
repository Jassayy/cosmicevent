"use client";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import EventCard from "./EventCard";
import LoadingSpinner from "./LoadingSpinner";

function toISO(date: Date) {
     return date.toISOString().slice(0, 10);
}

export function EventList() {
     const params = useSearchParams();
     const hazardOnly = params.get("haz") === "1";

     const [loading, setLoading] = useState(true);
     const [err, setErr] = useState<string | null>(null);
     const [range, setRange] = useState<{ start: Date; end: Date }>(() => {
          const today = new Date();
          const end = new Date();
          end.setDate(today.getDate() + 3);
          return { start: today, end };
     });
     const [feed, setFeed] = useState<any | null>(null);

     const fetchRange = async (start: Date, end: Date) => {
          setLoading(true);
          setErr(null);
          try {
               const res = await fetch(
                    `/api/neows?start_date=${toISO(start)}&end_date=${toISO(
                         end
                    )}`
               );
               if (!res.ok)
                    throw new Error(
                         (await res.json()).error || "Failed to fetch"
                    );
               const data = await res.json();
               setFeed(data);
          } catch (e: any) {
               setErr(e.message);
          } finally {
               setLoading(false);
          }
     };

     useEffect(() => {
          fetchRange(range.start, range.end);
     }, []);

     const days = useMemo(() => {
          if (!feed) return [] as { date: string; items: any[] }[];
          const obj = feed.near_earth_objects || {};
          const entries = Object.entries(obj).sort((a, b) =>
               a[0].localeCompare(b[0])
          );
          return entries.map(([date, items]) => ({
               date,
               items: (items as any[]).filter((i) =>
                    hazardOnly ? i.is_potentially_hazardous_asteroid : true
               ),
          }));
     }, [feed, hazardOnly]);

     const loadMore = () => {
          const newEnd = new Date(range.end);
          newEnd.setDate(newEnd.getDate() + 3);
          setRange({ start: range.start, end: newEnd });
          fetchRange(range.start, newEnd);
     };

     if (loading) return <LoadingSpinner />;
     if (err)
          return (
               <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                    {err}
               </div>
          );

     return (
          <div className="flex flex-col gap-6">
               {days.map(({ date, items }) => (
                    <section key={date} className="flex flex-col gap-3">
                         <h3 className="text-xl font-semibold opacity-90">
                              {date}
                         </h3>
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {items.map((neo) => (
                                   <EventCard key={neo.id} neo={neo} />
                              ))}
                         </div>
                    </section>
               ))}

               <div className="flex justify-center">
                    <button
                         onClick={loadMore}
                         className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-white/10"
                    >
                         Load more
                    </button>
               </div>
          </div>
     );
}
