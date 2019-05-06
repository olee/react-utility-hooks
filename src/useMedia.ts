import { useState, useEffect } from 'react';

/**
 * Utilize a media query to extend some component logic that depends on the current screen width or height
 * @param  queries          List of media queries. For example: '(min-width: 1280px)', '(min-width: 1000px)', '(min-width: 600px)'
 * @param  values           Relates and matches the media queries
 * @param  defaultValue     Default value if no media query match
 * @return value
 */

export function useMedia(queries: string[], values: any[], defaultValue: any) {
    const match = () => {
        const query = queries.findIndex(q => matchMedia(q).matches);
        return values[query] || defaultValue;
    };

    const [value, set] = useState(match);

    useEffect(() => {
        const handler = () => set(match);
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, []);

    return value;
}
