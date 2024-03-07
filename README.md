# motivational-picture-generator

A project to learn NodeJS, ExpressJS, and whatever else along the way.

**THIS IS ALL WORK IN PROGRESS AND SUBJECT TO CHANGE**

To start server

```bash
npm run dev
```

Make url request to `localhost:4000` with. Not providing all the parameters will cause the render to fail.

```bash
wget --output-document screenshot.png 'http://localhost:4200/submit/mpgParams?title=A Motivational Poster&sentence=something pithy&imageWidth=450px&imageUrl=https://picsum.photos/seed/1709802270038/300/300'
```



Testing with

```bash
ab -c 5 -t 15 http://localhost:4000/submit/\{\}
```