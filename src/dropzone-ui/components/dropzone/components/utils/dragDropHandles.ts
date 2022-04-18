/**
 * Performs stopPropagation and preventDefault functions on an drop event instance
 * @param evt drag event handler object
 */
export const handleDropUtil: React.DragEventHandler<HTMLDivElement> = (
  evt: React.DragEvent<HTMLDivElement>
) => {
  evt.stopPropagation();
  evt.preventDefault();
};
/**
 * Performs stopPropagation and preventDefault functions on an drop event instance
 * and also specifies that the drop effect is link
 * @param evt drag event handler object
 */
export const handleDragUtil: React.DragEventHandler<HTMLDivElement> = (
  evt: React.DragEvent<HTMLDivElement>
) => {
  handleDropUtil(evt);
  evt.dataTransfer.dropEffect = "link";
};
/**
 * Performs stopPropagation and preventDefault functions on an click event instance
 * @param evt click event handler object
 */
export function
  handleClickUtil<T extends HTMLDivElement | HTMLButtonElement | HTMLAnchorElement>
  (
    evt: React.MouseEvent<T, MouseEvent>
  ) {
  evt.preventDefault();
  evt.stopPropagation();
}
/**
 * Click programatically an input element.
 * If the input element is null, nothing will happend
 * @param input the input element target to make a click
 */
export const handleClickInput = (
  input: HTMLInputElement | null
) => {
  if (!input) return;
  input.click();
}