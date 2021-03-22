
export default {
    /**
     * Returns a function, that, as long as it continues to be invoked, will not
     * be triggered. The function will be called after it stops being called for
     * N milliseconds.
     */
    debounce : <T extends (...args: any[]) => any>(callback: T, waitFor: number) => {
        let timeout = 0;
        return (...args: Parameters<T>): ReturnType<T> => {
            let result: any;
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                result = callback(...args);
            }, waitFor);
            return result;
        };
    },
};
