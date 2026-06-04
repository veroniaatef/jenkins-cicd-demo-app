const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send(`
    <html>
      <body>
        <h1>Hello from Jenkins Pipeline</h1>
        <p>Build, Test and Deploy with Docker</p>
      </body>
    </html>
  `);
});
module.exports = app;
