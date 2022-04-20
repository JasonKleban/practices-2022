import * as React from "react";
import { hydrateRoot  } from "react-dom/client";
import { App } from "@practices/ui";

hydrateRoot(
    document.getElementById('root')!,
    <App title={"Whatever"} />
  );