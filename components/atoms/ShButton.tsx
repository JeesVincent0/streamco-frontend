import { ReactNode } from "react";
import { Button } from "../ui/button";

const ShButton = ({
  classValue = "",
  children,
  disabled,
}: {
  classValue?: string;
  children: ReactNode;
  disabled: boolean;
}) => {
  return (
    <Button className={classValue} disabled={disabled}>
      {children}
    </Button>
  );
};

export default ShButton;
