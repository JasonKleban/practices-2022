import * as React from "react";

// If we're careful not to import only types and no code to this declarations
// file, we won't have to manually sync complicated types.
import type { AppProps } from "./src/exported-interfaces";

/**
 * This manual definition is coming from practices-ui/bundle.d.ts file
 * since a webpacked bundle can't maintain correct inferred type declaration files.
 **/
export const fakeMarkerExport : undefined;

export const bar : string;

export const App : React.FunctionComponent<AppProps>