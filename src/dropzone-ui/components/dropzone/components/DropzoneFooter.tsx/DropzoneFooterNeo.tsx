import React, { FC } from "react";
import { DropzoneLocalizerSelector } from "../../../../localization";
import {
  FunctionLabel,
  Localization,
  LocalLabels,
} from "../../../../localization/localization";
import { handleClickUtil } from "../utils/dragDropHandles";
export interface DropzoneFooterNeoProps {
  accept?: string;
  message?: string;
  localization?: Localization;
}
const DropzoneFooterNeo: FC<DropzoneFooterNeoProps> = (
  props: DropzoneFooterNeoProps
) => {
  const { accept, message, localization } = props;

  const DropzoneFooterLocalizer: LocalLabels = DropzoneLocalizerSelector(
    localization
  ).footer as LocalLabels;
  const accepCustomMessenger: FunctionLabel =
    DropzoneFooterLocalizer.acceptCustom as FunctionLabel;
  function handleClick<T extends HTMLDivElement>(
    evt: React.MouseEvent<T, MouseEvent>
  ): void {
    handleClickUtil(evt);
  }
  return (
    <div className="dz-ui-footer" onClick={handleClick}>
      {message
        ? message
        : !accept
        ? DropzoneFooterLocalizer.acceptAll
        : accepCustomMessenger(accept)}
    </div>
  );
};
export default DropzoneFooterNeo;
