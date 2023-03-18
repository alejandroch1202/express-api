const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const {
  errorLogger,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');

const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="shortcut icon"
      href="https://raw.githubusercontent.com/alejandroch1202/express-api/e298c2b4a0862a2de49a758bcf981c510ca43485/assets/logo.svg"
      type="image/x-icon"
    />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;700&display=swap"
      rel="stylesheet"
    />
    <title>Express</title>
    <style>
      body {
        background-color: black;
        color: white;
        font-family: "Ubuntu", sans-serif;
      }
      body > div {
        margin-top: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 1px solid white;
        border-radius: 15px;
      }
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
      }
      .header div {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .header div img {
        width: 30px;
        height: 30px;
      }
      nav {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      nav img {
        width: 30px;
      }
      nav a {
        text-decoration: none;
      }
      h1 {
        margin: 0;
      }
      .routes {
        display: grid;
        place-items: center;
        grid-template-columns: 1fr;
        gap: 30px;
        padding: 30px;
      }
      .get,
      .post,
      .patch,
      .delete {
        padding: 4px;
        color: black;
      }
      .get {
        background-color: #593d7f;
      }
      .post {
        background-color: #73b32b;
      }
      .patch {
        background-color: #d3c137;
      }
      .delete {
        background-color: #93312c;
      }
      @media (min-width: 992px) {
        body > div {
          margin-top: 100px;
        }
        .routes {
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          padding: 30px;
        }
        .header {
          width: 700px;
        }
      }
    </style>
  </head>
  <body>
    <div>
      <div class="div">
        <div class="header">
          <div>
            <img
              src="https://raw.githubusercontent.com/alejandroch1202/express-api/e298c2b4a0862a2de49a758bcf981c510ca43485/assets/logo.svg"
              alt="logo"
            />
            <p>Welcome to my Express App</p>
          </div>

          <nav>
            <a target="_blank" href="https://alejandroch1202.github.io/">
              <img
                src="https://raw.githubusercontent.com/alejandroch1202/express-api/e298c2b4a0862a2de49a758bcf981c510ca43485/assets/web.svg"
                alt="website"
              />
            </a>
            <a target="_blank" href="https://github.com/alejandroch1202">
              <img
                src="https://raw.githubusercontent.com/alejandroch1202/express-api/e298c2b4a0862a2de49a758bcf981c510ca43485/assets/github.svg"
                alt="github"
              />
            </a>
            <a target="_blank" href="https://www.linkedin.com/in/alejandroch/">
              <img
                src="https://raw.githubusercontent.com/alejandroch1202/express-api/e298c2b4a0862a2de49a758bcf981c510ca43485/assets/linkedin.svg"
                alt="linkedin"
              />
            </a>
            <a target="_blank" href="https://twitter.com/alejandroch1202">
              <img
                src="https://raw.githubusercontent.com/alejandroch1202/express-api/e298c2b4a0862a2de49a758bcf981c510ca43485/assets/twitter.svg"
                alt="twitter"
              />
            </a>
          </nav>
        </div>

        <h1>App routes</h1>
        <div class="routes">
          <div>
            <p><span class="get"> [ GET ]</span> /api/v1/products</p>
            <p><span class="get"> [ GET ]</span> /api/v1/products/id</p>
            <p><span class="get"> [ GET ]</span> /api/v1/categories</p>
            <p><span class="get"> [ GET ]</span> /api/v1/categories/id</p>
            <p><span class="get"> [ GET ]</span> /api/v1/users</p>
            <p><span class="get"> [ GET ]</span> /api/v1/users/id</p>
          </div>

          <div>
            <p><span class="post"> [ POST ]</span> /api/v1/products</p>
            <p><span class="post"> [ POST ]</span> /api/v1/categories</p>
            <p><span class="post"> [ POST ]</span> /api/v1/users</p>
          </div>

          <div>
            <p><span class="patch"> [ PATCH ]</span> /api/v1/products/id</p>
            <p><span class="patch"> [ PATCH ]</span> /api/v1/categories/id</p>
            <p><span class="patch"> [ PATCH ]</span> /api/v1/users/id</p>
          </div>

          <div>
            <p><span class="delete"> [ DELETE ]</span> /api/v1/products/id</p>
            <p><span class="delete"> [ DELETE ]</span> /api/v1/categories/id</p>
            <p><span class="delete"> [ DELETE ]</span> /api/v1/users/id</p>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
`;

const app = express();
const port = process.env.PORT || 3000;
// const whitelist = ['http://localhost:3000', 'http://localhost:5500'];
// const options = {
//   origin: (origin, callback) => {
//     if (whitelist.includes(origin) || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed'));
//     }
//   },
// };

app.get('/', (req, res) => {
  res.send(html);
});

// This allow to receive json in body
// app.use(cors(options));
app.use(cors());
app.use(express.json());
routerApi(app);
app.use(errorLogger);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running in http://localhost:${port}`);
});
