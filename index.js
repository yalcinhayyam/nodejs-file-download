const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

app.get("/", (req, res) => {
  res.send(`<iframe src='https://view.officeapps.live.com/op/embed.aspx?src=http://localhost:3000/file' width='1366px' height='623px' frameborder='0'>This is an embedded <a target='_blank' href='http://office.com'>Microsoft Office</a> document, powered by <a target='_blank' href='http://office.com/webapps'>Office Online</a>.</iframe>`)
});
app.get("/file", (req, res) => {
  const filePath = path.join(process.cwd(), "rapor.docx");
  const stream = fs.createReadStream(filePath);

  stream.pipe(res);
});
app.listen(4000);
