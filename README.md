# finput-react
A thin React wrapper around the finput component

## Usage
You'll need [finput](https://github.com/scottlogic/finput) as a `peerDependency` in your project, alongside [react](https://github.com/facebook/react).
From there, simply render the wrapper component.

```jsx
import FinputReact from 'finput-react';

const render = () => {
  <FinputReact
    value={...}
    onChange={...}
    onBlur={...} />
};

export default render;
```

## API
* value - The value of the `finput`. Change this prop to force an update and format of a new value.
* onChange - Event, fired upon key entry. Raised with the raw, unformatted, value.
* onBlur - Event, fired when focus is lost. Raised with the raw, unformatted, value.

## redux-form
If you are using [redux-form](https://github.com/erikras/redux-form), then you will notice that the shape of the props passed to a form component is slightly different. This can be addressed by defining a custom proxy component. Here is a full example of rendering a redux form with a `finput` component:

```jsx
import React from 'react';
import { reduxForm, Field } from 'redux-form';
import FinputReact from 'finput-react';

const Wrapper = ({ input: { value, onChange, onBlur}}) =>
  <FinputReact value={value} onChange={onChange} onBlur={onBlur} />;

const TheForm = (props) => {
  return (
    <form>
      <h2>My Form</h2>
      <Field component={Wrapper} name="amount" />
    </form>
  );
};

export default reduxForm({
  form: 'finputForm',
  initialValues: {
    amount: '1000'
  }
})(TheForm);
```
