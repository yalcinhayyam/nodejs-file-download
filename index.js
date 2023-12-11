const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 4000;
const PRIVATE_IP = "localhost";
const PUBLIC_IP = "localhost";


app.get('/',(req,res)=> {
  res.send('Server running!!')
})


app.get("/:file", (req, res) => {
  res.send(`
  <iframe src="https://docs.google.com/gview?url=${PUBLIC_IP}/file/${req.params.file}&embedded=true"></iframe>
  <iframe 
  src='https://view.officeapps.live.com/op/embed.aspx?src=${PUBLIC_IP}/file/${req.params.file}' 
  width='1366px' height='623px' frameborder='0'>This is an embedded <a target='_blank' href='http://office.com'>Microsoft Office</a> document, powered by <a target='_blank' href='http://office.com/webapps'>Office Online</a>.</iframe>`);
});
app.get("/file/:file", (req, res) => {
  const file = req.params.file;
  const filePath = path.join(process.cwd(), file);
  const stream = fs.createReadStream(filePath);
  switch (path.extname(file)) {
    case "pdf":
      res.contentType("application/pdf");
      break;
    case "png":
      res.contentType("image/png");
      break;
    case "docx":
      res.contentType(
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      );
      break;
  }
  stream.pipe(res);
});
app.listen(PORT, PRIVATE_IP, () => {
  console.log(`Server started on private ip and port http://${PRIVATE_IP}:${PORT}/`);
});
