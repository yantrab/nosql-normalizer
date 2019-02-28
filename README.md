# suppressJS
Suppress json object to decrease response object size, by removing duplicate entities

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
