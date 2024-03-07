# motivational-picture-generator

A project to learn NodeJS, ExpressJS, and whatever else along the way.

**THIS IS ALL WORK IN PROGRESS AND SUBJECT TO CHANGE**

To start server

```bash
npm run dev
```

Make url request to `localhost:4000` with. Not providing all the parameters will cause the render to fail atm. Have only added optional checking for CSS colors for now with garish defaults so I can see if something failed.

```bash
wget --output-document screenshot.png 'http://localhost:4200/submit/mpgParams?title=A Motivational Poster&sentence=something pithy&imageWidth=600px&imageUrl=https://dj.tdn.wf/image/400x300/282828&titleColor=blue&sentenceColor=orange&borderColor=red&backgroundColor=%23107a00'
```

This generates

![](screenshots/screenshot.png)

Testing with

```bash
ab -c 5 -t 15 http://localhost:4000/submit/\{\}
```