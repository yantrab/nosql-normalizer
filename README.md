# suppressJS
Suppress your json object to decrease the response size.

# Usage
suppress response data by:
```javascript
import { suppress } from 'suppress-js';
return json.call(res, suppress(result));
```
[Here](https://github.com/yantrab/nest-angular/blob/master/server/src/middlewares/suppress.middleware.ts) is example of express middleware 

de-suppress response data by
 ```javascript 
 deSuppress(response)
 ```
