import React from 'react';
import { DatePicker } from 'antd';
import {FormattedMessage} from 'react-intl';

const App = React.createClass({
  render() {
    return (<div style={{margin: 20}}>
      <div style={{margin: 10}}>
        <p><a href="index.html">中文</a></p>
        <p><a href="index-en.html">english</a></p>
      </div>
      <div>
        <FormattedMessage id="app.date-picker.title" defaultMessage="日期选择"/>: &nbsp;
        <DatePicker locale={window.appLocale.messages.datePickerLocale}/>
      </div>
    </div>);
  },
});

export default App;
