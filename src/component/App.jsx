import React from 'react';
import { Datepicker } from 'antd';
import {FormattedMessage} from 'react-intl';

const App = React.createClass({
  render() {
    return (<div style={{margin: 20}}>
      <div style={{margin: 10}}>
        <p><a href="index.html">中文</a></p>
        <p><a href="index-en.html">english</a></p>
      </div>
      <div>
        <FormattedMessage id="app.date-picker.title"/>: &nbsp;
        <Datepicker locale={window.appLocale.data.datePickerLocale}/>
      </div>
    </div>);
  },
});

export default App;
