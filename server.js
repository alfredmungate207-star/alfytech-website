// Zero-dependency local server for AlfyTech.
// Run: node server.js
const http=require("http"),fs=require("fs"),path=require("path");
const root=__dirname, port=process.env.PORT||3000;
const types={".html":"text/html",".css":"text/css",".js":"text/javascript",".svg":"image/svg+xml",".json":"application/json"};
http.createServer((req,res)=>{
 let file=path.join(root,decodeURIComponent(req.url.split("?")[0]));
 if(file.endsWith("/"))file+= "index.html";
 if(!file.startsWith(root))return res.writeHead(403).end();
 fs.readFile(file,(err,data)=>{if(err){res.writeHead(404);return res.end("Not found")}res.writeHead(200,{"Content-Type":types[path.extname(file)]||"application/octet-stream"});res.end(data)})
}).listen(port,()=>console.log(`AlfyTech running at http://localhost:${port}`));
