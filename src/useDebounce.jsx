import { useEffect, useState } from "react";

function useDebouncedState(value, delay = 500) {
    const [debouncedName, setDebouncedName] = useState(value)

    useEffect(() => {
        const ref = setTimeout(() => {
            setDebouncedName(value)
        }, delay)

        return () => {clearTimeout(ref)}
    }, [value, delay])

    return debouncedName
}

export default useDebouncedState;