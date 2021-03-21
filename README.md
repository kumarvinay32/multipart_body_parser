# multipart-body-parser

Express Multipart body data Parser: parse multipart form data to valid array consisting key value pair with file buffer.

## Install

```
  npm install @krvinay/multipart-body-parser
```

## Usage (Global)

```javascript
multipart_parser = require("@krvinay/multipart-body-parser");
app = require("express")();
app.use(multipart_parser);
```

## Usage (Middleware)

```javascript
multipart_parser = require("@krvinay/multipart-body-parser");
app = require("express")();
app.post("/", multipart_parser, (req, res, next) => {
  console.log(req.body);
});
```