import { ReactNode } from "react";
import { Button } from "../ui/button";

const ShButton = ({
  children,
  disabled,
}: {
  children: ReactNode;
  disabled: boolean;
}) => {
  return <Button disabled={disabled}>{children}</Button>;
};

export default ShButton;
