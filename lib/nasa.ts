export type NeoFeed = {
    element_count: number;
    near_earth_objects: Record<string, any[]>;
    };
    
    
    export function averageKmDiameter(neo: any) {
    const d = neo.estimated_diameter?.kilometers;
    if (!d) return null;
    return (d.estimated_diameter_min + d.estimated_diameter_max) / 2;
    }
    
    
    export function getApproach(neo: any) {
    const a = neo.close_approach_data?.[0];
    if (!a) return null;
    return {
    date: a.close_approach_date_full || a.close_approach_date,
    missDistanceKm: parseFloat(a.miss_distance?.kilometers ?? "NaN"),
    velocityKps: parseFloat(a.relative_velocity?.kilometers_per_second ?? "NaN"),
    orbitingBody: a.orbiting_body,
    };
    }