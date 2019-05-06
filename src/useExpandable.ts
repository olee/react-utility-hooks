import { useState, useCallback, useMemo } from 'react';
import { useConstant } from './';

export default function useExpandable<TElement extends HTMLElement = HTMLDivElement>(element: TElement | null, initiallyExpanded = false, duration = 600) {
    const [expanded, setExpanded] = useState(initiallyExpanded);
    const [transitioning, setTransitioning] = useState(false);

    const collapse = useConstant(() => {
        if (element) {
            element.style.maxHeight = element.clientHeight + 'px'; // Explicitly set max-height directly so transiton works correctly
            element.getClientRects(); // Force reflow
        }
        setExpanded(false);
        setTransitioning(true);
    });

    const expand = useConstant(() => {
        setExpanded(true);
        setTransitioning(true);
    });

    const toggle = useCallback(() => expanded ? collapse() : expand(), [expanded]);
    
    const onTransitionEnd = useConstant(() => setTransitioning(false));
    
    const style = useMemo(() => ({
        overflow: !expanded || transitioning ? 'hidden' : undefined,
        maxHeight: !expanded ? 0 :
            transitioning && element ? element.scrollHeight :
                undefined,
        transition: `all ease-in-out`,
        transitionDuration: duration + 'ms',
    }), [duration, expanded, transitioning]);
    
    return {
        expanded,
        actions: {
            toggle,
            expand,
            collapse,
        },
        container: {
            onTransitionEnd,
            style,
        },
    };
}
