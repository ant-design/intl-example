# React Intl Corner Cases

> Examples about how to handle corner cases especially when you're using libraries like redux and so on.

* use defineMessages with intl.formatMessage()
  ```javascript
  const messages = defineMessages({
    placeholder: {
      id: 'OperatorSearchInput.placeholder',
      defaultMessage: '请选择人员',
    },
    notFoundContent: {
      id: 'OperatorSearchInput.notFoundContent',
      defaultMessage: '未找到匹配人员',
    },
    searchPlaceholder: {
      id: 'OperatorSearchInput.searchPlaceholder',
      defaultMessage: '输入关键词',
    },
  });
  
  ...
  <Select
        showSearch
        placeholder={intl.formatMessage(messages.placeholder)}
        notFoundContent={intl.formatMessage(messages.notFoundContent)}
        searchPlaceholder={intl.formatMessage(messages.searchPlaceholder)}
    ...
  ```
* react-intl usage inside actions or maybe redux-sagas(somewhere you can't directly access the react-intl's apis)
* react-intl usage with `antd`/`rc-form` form validation
* react-intl usage with `Enums`
