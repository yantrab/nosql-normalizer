# suppressJS
Suppress json object to speed rest api, by removing duplicate entities

## What suppressJS does
If you are using nosql database, and your table is look like this, so do suppress of this json, exlude all entities to a nother store object.
See here the result.

## Why should i use this package

1. decrease response size, in my example, 674 kb became to 140kb;
   end response time  53ms became to 33ms.
2. decrease memory size, if you store the object in memory, using suppress and de-supress,
   does decrease  memory size dramaticaly.
   in my exmple, 755780B became to 189296B.

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

 ### Use it as express middleware
 ```typescript
     resolve = (req, res, next) => {
        const json = res.json;
        res.json = (result) => {
            const suppressResult = suppress(result);
            return json.call(res, suppressResult);
        };
        return next();
    }
```