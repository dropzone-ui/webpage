import { darkerColor, asureColor, brighterColor, colourNameToHex, hexColorToRGB, hexTodec, isHexColor } from "./colors.base";
import { NamedColor as NamedColorType, NAMED_COLORS } from "./namedColors.base";

import { OverridableComponentProps } from "./OverridableComponentProps";
import { mergeProps } from "./utils.base";

export type NamedColor = NamedColorType;
//export type OverridableComponentProps = OverridableComponentPropsType;
export { darkerColor, asureColor, brighterColor, colourNameToHex, hexColorToRGB, hexTodec, isHexColor, NAMED_COLORS, mergeProps };
export type { OverridableComponentProps };
