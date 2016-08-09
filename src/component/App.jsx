import React from 'react';
import { DatePicker, Pagination } from 'antd';
import { FormattedMessage, defineMessages } from 'react-intl';
import InjectExample from './InjectExample';


const messages = defineMessages({
  datePicker: {
    id: 'App.datePicker.title',
    defaultMessage: '日期选择',
  },
});

class App extends React.Component {
  render() {
    return (<div style={{ margin: 20 }}>
      <div style={{ margin: 10 }}>
        <p><a href="index.html">中文</a></p>
        <p><a href="index-en.html">english</a></p>
      </div>
      <div style={{ margin: 10 }}>
        <FormattedMessage {...messages.datePicker} />: &nbsp;
        <DatePicker />
      </div>
      <div style={{ margin: 10 }}>
        <Pagination showQuickJumper defaultCurrent={2} total={500} />
      </div>
      <div style={{ margin: 10 }}>
        <InjectExample />
      </div>
    </div>);
  }
}

export default App;
