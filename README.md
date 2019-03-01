# suppressJS
Suppress json object to speed up your rest api, by removing duplicate entities

## What suppressJS does
If you are using nosql database, and your table is look like [this](https://github.com/yantrab/suppressJS/blob/master/spec/funds.json), so do suppress of this json, exlude all entities to a nother store object.
See [here](https://github.com/yantrab/suppressJS/blob/master/spec/fundsAfterSuppress.json) the result.

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
suppress(result, //* id property, defualt :'_id'*//);
```

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
