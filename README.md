# suppressJS
Suppress json object to speed rest api, by removing duplicate entities

## What suppressJS do
If you are using nosql database, and your table is look like this, so do suppress of this json, exlude all entities to a nother store object.
See here see the result.

## Why should i use this package


# Usage
install by npm
```
npm i suppress-js
```

### suppress response data by:
```javascript
import { suppress, deSuppress } from 'suppress-js';
suppress(result);
```
[Here](https://github.com/yantrab/nest-angular/blob/master/server/src/middlewares/suppress.middleware.ts) is an example of express middleware 

### de-suppress response data by
 ```javascript 
 deSuppress(response);
 ```
