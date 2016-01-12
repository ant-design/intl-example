# intl-examples

## Environment

```
node >= 0.12
```

## Code Style

https://github.com/airbnb/javascript

## Develop


```
npm install
npm run dev
```

- Chinese: http://127.0.0.1:8000
- English: http://127.0.0.1:8000/index-en.html

## I18n Support

Using [babel-plugin-react-intl](https://github.com/yahoo/babel-plugin-react-intl) to extract all default messages into `./i18n-messages` to be provided to translators.
```
npm run build:i18n-messages
```

You could also run a script to extract all those translations into `./locale/*.js` files.
```
npm run build:i18n-js
```
