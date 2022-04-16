import { mergeProps } from "@dropzone-ui/core";
import * as React from "react";
import { SkeletonDefaultProps, SkeletonProps } from "./SkeletonProps";
import "./Skeleton.scss";
/**
 * Dui Skeleton component inspired on Mui Skeleton component
 *
 * Demos:
 *
 * - [Skeleton Demo](https://mui.com/components/skeleton/)
 *
 * API:
 *
 * - [Skeleton API](https://mui.com/api/skeleton/)
 */
const Skeleton: React.FC<SkeletonProps> = (props: SkeletonProps) => {
  const { className, animation, variant, width, height, style } = mergeProps(
    props,
    SkeletonDefaultProps
  );
  const [extendedClassName, setExtendedClassName] = React.useState<
    string | undefined
  >(undefined);
  React.useEffect(() => {
    let finalClassName: string = "";
    if (animation || variant || className) {
      finalClassName = " ";
    }
    // animation
    if (animation) {
      if (animation === "wave") {
        finalClassName += " wave";
      } else {
        finalClassName += " pulse";
      }
    }

    //variant
    if (variant === "circular") {
      finalClassName += " circular";
    } else {
      finalClassName += " rectangular";
    }
    if (className) {
      finalClassName += " " + className;
    }

    setExtendedClassName(finalClassName);
  }, [animation, variant, className]);

  return (
    <div
      className={`dui-mui-skeleton${extendedClassName}`}
      style={{ ...style, width: width, height: height }}
    ></div>
  );
};
export default Skeleton;
