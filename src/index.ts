export class LocalStorageHandler {
    cacheHours: number;

    /**
     * @param cacheHours: Default is 24 Hours, specify if you need less or more
     */
    constructor(params: { cacheHours?: number }) {
        const { cacheHours } = params;
        this.cacheHours = cacheHours ? cacheHours : 24;
    }

    private getTimeStampKey = (key: string): string => {
        return `${key}-timestamp`;
    };

    /**
     * Checks the key and returns the value from LocalStorage if data saved in last cachedHours.
     * If no data within last cacheHours, returns null.
     * If data, returns String value from the Storage.
     * @param key the key to check
     * @param checkCacheHours specify if you want to check the cachehours or return the value no matter when set
     * @param cacheHours specify if you want to overwrite the cacheHours of the Local Storage Handler and check with the new value
     * @returns Value from Local Storage as String or null
     */
    getFromLocalStorage = (params: { key: string; checkCacheHours?: boolean; cacheHours?: number }): string | null => {
        const { key, checkCacheHours, cacheHours } = params;

        const localData = localStorage.getItem(key);
        const localDataTimeStamp = localStorage.getItem(this.getTimeStampKey(key));

        if (checkCacheHours !== undefined && !checkCacheHours) return localData;

        // If Local Storage has the data less than cacheHours
        if (cacheHours) this.cacheHours = cacheHours;

        if (localDataTimeStamp !== null) {
            const dt = new Date(JSON.parse(localDataTimeStamp));
            const hours = Math.abs(new Date().getTime() - dt.getTime()) / 3600000;
            if (hours < this.cacheHours && localData !== null) {
                return localData;
            }
        }

        return null;
    };

    /**
     * Sets the LocalStorage Value with provided key
     * Sets also a timestamp in LocalStorage for the provided key
     * You need to return the LocalStorage value by utilizing the getFromLocalStorage() function
     * @param key
     * @param value
     */
    setLocalStorage = (params: { key: string; value: string }): 'success' => {
        const { key, value } = params;
        localStorage.setItem(key, value);
        localStorage.setItem(this.getTimeStampKey(key), JSON.stringify(new Date()));
        return 'success';
    };

    /**
     * @param key - key to remove from local storage
     */
    removeFromLocalStorage = (params: { key: string }): 'success' | 'not-found' => {
        const { key } = params;

        const localData = localStorage.getItem(key);
        if (!localData) return 'not-found';

        // Delete the key first if found
        localStorage.removeItem(key);

        // Delete the timestamp if found
        const timestampKey = this.getTimeStampKey(key);
        const localTimestamp = localStorage.getItem(timestampKey);
        if (localTimestamp) localStorage.removeItem(timestampKey);

        return 'success';
    };
}
