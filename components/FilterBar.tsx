"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function FilterBar() {
     const router = useRouter();
     const params = useSearchParams();

     const [hazOnly, setHazOnly] = useState(params.get("haz") === "1");

     const apply = () => {
          const sp = new URLSearchParams(params.toString());
          if (hazOnly) sp.set("haz", "1");
          else sp.delete("haz");

          router.push(`/?${sp.toString()}`);
     };

     return (
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-neutral-900 border border-white/10">
               <div className="flex items-center gap-2">
                    <label className="inline-flex items-center gap-2 cursor-pointer">
                         <input
                              type="checkbox"
                              className="accent-brand"
                              checked={hazOnly}
                              onChange={(e) => setHazOnly(e.target.checked)}
                         />
                         <span>Hazardous only</span>
                    </label>
               </div>
               <button
                    onClick={apply}
                    className="px-3 py-2 rounded-xl bg-brand hover:bg-brand-dark transition"
               >
                    Apply Filters
               </button>
          </div>
     );
}
