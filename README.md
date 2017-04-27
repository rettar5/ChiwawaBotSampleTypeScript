# ChiwawaBotSample

## Get Start

```
$ git clone https://github.com/rettar5/ChiwawaBotSampleTypeScript.git
$ cd ChiwawaBotSampleTypeScript
$ npm install
$ npm install -g typescript
$ vim ChiwawaConfig.ts    # トークンその他諸々を設定
$ npm run build:start
```

## Deploy to Heroku

```
$ heroku git:remote --app [app name]
$ npm run build
$ git add dist
$ git commit -m "Deploy to Heroku"
$ git push heroku master
```
