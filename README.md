# @bpmn-io/replace-ids

Replace `ID` placeholders in a template with actual unique ids.


## Usage

```javascript
import replaceIds from '@bpmn-io/replace-ids';

const generator = {
  count: 0,
  next() {
    return this.count++;
  }
};

const template = `
  This is a {{ ID:a }} {{ ID }} {{ ID:a }}
`;

const replaced = replaceIds(template, generator);

// replaced = `
//   This is a 0 1 0
// `
```


## License

MIT