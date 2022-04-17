import React, { FC } from "react";
export interface DropzoneLabelProps {
  children: React.ReactNode | string;
}

const DropzoneLabelNeo: FC<DropzoneLabelProps> = (props: DropzoneLabelProps) => {
  const { children } = props;
  return <div className="dz-ui-label">{children}</div>;
};
export default DropzoneLabelNeo;
