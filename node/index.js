const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const request = require("request");
const jwt = require('jsonwebtoken');
const CHAT_SECRET =
    '94A2A615E76FFB59A496DF997A82EC6790D23E5DFD3DC4EA17427E65D87B4504';
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );
    if(req.method==="OPTIONS"){
      return res.sendStatus(200)
    }
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.post("/jwt/chat-token", (req, res, next) => {
  let name, email, token;
  name = req.body.name ? req.body.name : 'user12';
  email = req.body.email ? req.body.email : 'user12@gmail.com';
  const user = {
    name: name,
    email: email,
    iat: Math.floor(Date.now() / 1000),
    external_id: `zendesk-${name}@gmail.com`
  };
  token = jwt.sign(user, CHAT_SECRET);
  return res.json({token});
})

app.use("/api/*", (req, res, next) => {
  request(
    {
        url: "https://cryptonomics.zendesk.com" + req.originalUrl,
        method: req.method,
        headers: {
            "Content-Type": req.headers["content-type"],
            Authorization: req.headers.authorization
        },
        body: JSON.stringify(req.body)
    },
    (error, response, body) => {
        if ([404,500,403].includes(response.statusCode)) {
            return res.json("error:" + response.statusCode);
        } else {
          if (body) {
            return res.json(JSON.parse(body));
          } else {
            return res.json({body: ""});
          }
        }
    }
  );
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`listening on ${PORT}`));