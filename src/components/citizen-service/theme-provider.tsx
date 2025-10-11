"use client";

import * as React from "react";

export function ThemeProvider({
  children,
  ...props
}: React.PropsWithChildren<React.ComponentProps<"div">>) {
  return <ThemeProvider {...props}>{children}</ThemeProvider>;
}
