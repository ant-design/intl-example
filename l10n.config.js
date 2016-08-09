module.exports = {
  "middlewares": {
    "summary": [
      "summary?sourcePattern=i18n-messages/**/*.json"
    ],
    "process": [
      "fetchLocal?source=locales,skip",
      "metaToResult?from=defaultMessage,to=zh",
      "youdao?apiname=iamatestmanx,apikey=2137553564",
      "reduce?-autoPick,autoReduce[]=local,autoReduce[]=meta"
    ],
    "emit": [
      "save?dest=locales"
    ]
  }
}