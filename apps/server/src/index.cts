import * as express from "express";
import { Request, Response } from "express";
import * as path from "path";

import * as React from "react";
import * as ReactDOMServer from "react-dom/server";

(async () => {
  const { App } = await import("@practices/ui");

  const assetsPath = path.dirname(require.resolve("@practices/client"));

  global.console.log(`Serving from ${assetsPath}.`);

  const app = express();

  const expressStatic = express.static(assetsPath); // type error if I don't separate these lines
  app.use("/assets", expressStatic);

  app.get("/", (_: Request, response: Response) => {
    const content = ReactDOMServer.renderToString(React.createElement(App, { title: "Whatever" }));

    response.status(200).send(`<!doctype html><body><div id="root">${content}</div><script src="./assets/main.js"></script></body>`);
  });

  app.all("/favicon.ico", (_: Request, response: Response) => {
    response.status(204).end();
  });

  app.listen(8080, () => {
    console.log(`Example app listening on port ${8080}`);
  });
})();
