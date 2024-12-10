// import https from "https";
// import fs from "fs";
// import app from "./app.js";

// const PORT = process.env.PORT || 5000;

// const sslOptions = {
//   key: fs.readFileSync("./cert/localhost+2-key.pem"),
//   cert: fs.readFileSync("./cert/localhost+2.pem"),
// };

// https.createServer(sslOptions, app).listen(PORT, () => {
//   console.log(`HTTPS SERVER STARTED AT https://localhost:${PORT}`);
// });

import app from "./app.js";

app.listen(process.env.PORT, ()=>{
    console.log(`SERVER HAS STARTED AT PORT ${process.env.PORT}`);
})