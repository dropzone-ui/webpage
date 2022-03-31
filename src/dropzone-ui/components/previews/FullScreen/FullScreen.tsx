import * as React from "react";
import { Cancel } from "../../../icons";
import { FullScreenProps } from "./FullScreenProps";
import "./FullScreen.scss";
const FullScreen: React.FC<FullScreenProps> = (props: FullScreenProps) => {
  const { open, onClose, children } = props;
  function handleClose<T extends HTMLDivElement>(
    e: React.MouseEvent<T, MouseEvent>
  ): void {
    //avoid children to trigger onClick ripple from parent
    e.stopPropagation();
    onClose?.();
  }

  return (
    <div
      className={
        open ? "dui-fullscreen-container show" : "dui-fullscreen-container"
      }
      onClick={handleClose}
    >
      {open && (
        <div
          className="dui-fullscreen-relative-container"
          onClick={(evt) => {
            evt.preventDefault();
          }}
        >
          {children}
          <Cancel
            color="rgba(255,255,255,0.8)"
            onClick={handleClose}
            colorFill="black"
            className="button-full-screen"
          />
        </div>
      )}
    </div>
  );
};
export default FullScreen;
