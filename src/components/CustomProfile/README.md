```jsx
const {
  default: { schema },
} = require('../../fixtures/customProfileSchema.js');
const value = {
  lastName: 'Rodgers 🦐',
  age: 97,
  bio: 'Roundhouse kicking asses since 1940',
  password: 'noneed',
  done: true,
  telephone: '+1 234 567 89 00',
};

<CustomProfile schema={JSON.stringify(schema)} value={JSON.stringify(value)} />;
```
