# Local Storage Handler

Cookies are good options for keeping data for limited time on client side. But what if you have data, which is much bigger than cookies accept? You might still want to have `expire date` for the data. This small library will help you to achieve this. It will basically set local storage items with a time stamp and retrieve them by checking how many hours ago it was set. You decide by specifying the number of hours. It is useful for applications where you have data, which needs to be refreshed once in a while but you don't need to refresh after each page load and you want to unload your server a little bit.

-   The library is written in Typescript, hence, you have built-in type support.

-   No additional dependencies.

-   The handler basically sets a timestamp for each key. Every time you try to retrieve the key, it will check the timestamp if it key value is set earlier than the `cacheHours` hours. If not, it will return the `string value`. If older, it will return `null`

## Install the Library

```shell
npm i @ozntel/local-storage-handler
```

## Import

```ts
import { LocalStorageHandler } from '@ozntel/local-storage-handler';
```

## Usage

```ts
// You can create Handler by passing specified cacheHours
let lsh = new LocalStorageHandler({ cacheHours: 0.5 });

// or use 24 Hours by default and pass only an empy object
let lsh = new LocalStorageHandler({});

// You can change the cacheHours later on
lsh.cacheHours = 12;

// Set a new Local Storage Value - it will return 'success' but you don't need to assign to variable
let setResp = lsh.setLocalStorage({ key: 'key1', value: 'value1' });

// Get Local Storage Item. It will return value if the data set is not older than cached Hours or null if key not found or is older than cachedHours
let val1 = lsh.getFromLocalStorage({ key: 'key1' });

// You can ask for local storage item by ignoring the cacheTime. It will return no matter when the local storage key was set
let val1 = lsh.getFromLocalStorage({ key: 'key1', checkCacheHours: false });

// If you want to check the value by certain cacheTime, you can also pass additionally
let val1 = lsh.getFromLocalStorage({ key: 'key1', checkCacheHours: false, cacheHours: 5 });

// Finally you can remove the local storage key, it will return 'success' if deleted or 'not-found' if it couldn't find the key. It will also delete the timestamp related to the key from local storage.
let clearResp = lsh.removeFromLocalStorage({ key: 'key1' });
```
