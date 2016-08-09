import React, { PropTypes } from 'react';
import { Button } from 'antd';
import { injectIntl, FormattedMessage, defineMessages } from 'react-intl';

const messages = defineMessages({
  description: {
    id: 'InjectExample.description',
    defaultMessage: '我是描述',
  },
  alert: {
    id: 'InjectExample.alert',
    defaultMessage: '我是提醒',
  },
  button: {
    id: 'InjectExample.button',
    defaultMessage: '弹窗',
  },
});

class InjectExample extends React.Component {
  handleClick() {
    alert(this.props.intl.formatMessage(messages.alert));
  }
  render() {
    return (
      <div>
        <div style={{ margin: 10 }}>{ this.props.intl.formatMessage(messages.description) }</div>
        <Button onClick={() => this.handleClick()}>
          <FormattedMessage {...messages.button} />
        </Button>
      </div>
    );
  }
}

const propTypes = {
  intl: PropTypes.object.isRequired,
};
InjectExample.propTypes = propTypes;

export default injectIntl(InjectExample, {
  withRef: true,
});
