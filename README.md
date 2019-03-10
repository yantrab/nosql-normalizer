# nosql-normalizer
Reduce json object, by normalized it, to speed up your rest api.

## What nosql-normalizer does
If you are using nosql database, and your table is look like [this](https://github.com/yantrab/nosql-normalizer/blob/master/spec/funds.json), so do normalize of this json, exlude all entities to a nother store object.
See [here](https://github.com/yantrab/nosql-normalizer/blob/master/spec/fundsAfterSuppress.json) the result.

## Why should i use this package

1. decrease response size, in my example, 674 kb became to 140kb;
   end response time  53ms became to 33ms.
2. decrease memory size, if you store the object in memory, using normalize and de-normalize,
   does decrease  memory size dramaticaly.
   in my exmple, 755780B became to 189296B.

# Usage
install by npm
```
npm i nosql-normalizer
```

### normalize response data by:
```javascript
import { normalize, denormalize } from 'nosql-normalizer';
normalize(result, //* id property, defualt :'_id'*//);
```

### de-normalize response data by
 ```javascript 
 denormalize(response);
 ```

 ### Use it as express middleware
 ```typescript
     resolve = (req, res, next) => {
        const json = res.json;
        res.json = (result) => {
            return json.call(res, normalize(result));
        };
        return next();
    }
```
