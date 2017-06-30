import React, { Component } from 'react';
import finput from 'finput';

class FinputReact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      externalUpdate: false,
      initialUpdate: !!(props.value)
    };
  }

  componentWillReceiveProps(nextProps) {
    const { value } = nextProps;

    this.setState({
      externalUpdate: value !== this.input.rawValue
    });
  }

  render() {
    const { onBlur, onChange, value, options, ...others } = this.props;
    const { externalUpdate } = this.state;

    return (
      <input
        ref={input => {
          this.input = input;
          if (this.input && externalUpdate) {
            this.input.setRawValue(value);
          }
        }}
        onKeyDown={e => { onChange(this.input.rawValue); }}
        onBlur={e => { onBlur(this.input.rawValue); }}
        {...others}
      />
    );
  }

  componentDidMount() {
    const { value, options } = this.props;
    const { initialUpdate } = this.state;

    this.destroy = finput(this.input, options);
    if (initialUpdate) {
      this.input.setRawValue(value);
    }
  }

  componentWillUnmount() {
    this.destroy();
  }
};

FinputReact.defaultProps = {
  value: null,
  options: null,
  onChange: () => {},
  onBlur: () => {}
};

export default FinputReact;
