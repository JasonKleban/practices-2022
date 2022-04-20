import * as express from "express";
import * as path from "path";

const assetsPath = path.dirname(require.resolve("@practices/client"));

global.console.log(`Serving from ${assetsPath}.`);

const app = express();

const expressStatic = express.static(assetsPath);
app.use("/assets", expressStatic); // type error if I don't separate these

app.listen(8080, () => {
  console.log(`Example app listening on port ${8080}`)
})