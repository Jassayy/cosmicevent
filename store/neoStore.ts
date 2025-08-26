import { create } from "zustand";
import { persist } from "zustand/middleware";

export type selectedNeo = {
     id: string;
     name: string;
     isHazardous: boolean;
     avgDiameterKm: number | null;
     approach: {
          date: string;
          missDistanceKm: number;
          velocityKps: number;
          orbitingBody: string;
     } | null;
};

type State = {
     selected: Record<string, selectedNeo>;
     setSelected: (neo: selectedNeo, checked: boolean) => void;
     clear: () => void;
};

export const useNeoStore = create<State>()(
     persist(
          (set, get) => ({
               selected: {},
               setSelected: (neo, checked) => {
                    const cur = { ...get().selected };

                    if (checked) cur[neo.id] = neo;
                    else delete cur[neo.id];

                    set({ selected: cur });
               },

               clear: () => set({ selected: {} }),
          }),
          { name: "cosmic-selected-neos" }
     )
);
