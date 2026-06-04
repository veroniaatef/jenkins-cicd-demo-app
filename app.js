

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

app.listen(3000, () => {
  console.log("Server running on port 3000");
});