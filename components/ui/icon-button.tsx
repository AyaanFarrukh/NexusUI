import * as React from "react";
import { Button, type ButtonProps } from "./button";

export const IconButton = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
  <Button ref={ref} size="icon" {...props} />
));
IconButton.displayName = "IconButton";