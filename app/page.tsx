import { EventList } from "@/components/EventList";
import FilterBar from "@/components/FilterBar";
import Link from "next/link";

export default function Home() {
     return (
          <div className="flex flex-col gap-6">
               <div className="flex items-center justify-between">
                    <h1 className="text-2xl md:text-3xl font-bold">
                         Upcoming Near‑Earth Objects
                    </h1>
                    <Link
                         href="/compare"
                         className="px-3 py-2 rounded-xl bg-brand hover:bg-brand-dark transition"
                    >
                         Compare
                    </Link>
               </div>
               <FilterBar />
               <EventList />
          </div>
     );
}
