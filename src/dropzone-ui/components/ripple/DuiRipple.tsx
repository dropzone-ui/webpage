import * as React from "react";
import { DuiRippleProps } from "./DuiRippleProps";
import "./DuiRipple.scss";
import { createDuiRippleFromDiv2 } from "../../utils/ripple/ripple";
const DuiRipple: React.FC<DuiRippleProps> = (props: DuiRippleProps) => {
  const { onLoad, color, disableRipple } = props;
  const [startRipple, setStartRipple] = React.useState<boolean>(false);
  //ref to handle ripple
  const duiRippleRefAbs = React.useRef<HTMLDivElement>(null);
  const duiRippleRefRel = React.useRef<HTMLDivElement>(null);
  
  React.useEffect(() => {
    onLoad?.(setStartRipple);
  }, []);
  React.useEffect(() => {
    if (startRipple) {
      createDuiRippleFromDiv2(
        duiRippleRefAbs.current,
        duiRippleRefRel.current,
        color as string
      );
      setStartRipple(false);
    }
  }, [startRipple]);
  if (disableRipple) {
    return (
      <div ref={duiRippleRefAbs} className="dropzone-ui-base-ripple-absolute">
        <div
          ref={duiRippleRefRel}
          className="dropzone-ui-base-ripple-relative"
        ></div>
      </div>
    );
  } else {
    return <React.Fragment></React.Fragment>;
  }
};
export default DuiRipple;
