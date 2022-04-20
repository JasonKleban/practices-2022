import * as React from "react";
import { AppProps } from "./exported-interfaces.jsx";

export const App = ({ title } : AppProps) => {
    return (
      <div>
        <h1 suppressHydrationWarning={true}>{title}</h1>
      </div>
    );
}