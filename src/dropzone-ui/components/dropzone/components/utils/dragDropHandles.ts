export const handleDragUtil: React.DragEventHandler<HTMLDivElement> = (
  evt: React.DragEvent<HTMLDivElement>
) => {
  handleDropUtil(evt);
  evt.dataTransfer.dropEffect = "link";
};

export const handleDropUtil: React.DragEventHandler<HTMLDivElement> = (
  evt: React.DragEvent<HTMLDivElement>
) => {
  evt.stopPropagation();
  evt.preventDefault();
};
export function
  handleClickUtil<T extends HTMLDivElement>
  (
    evt: React.MouseEvent<T, MouseEvent>
  ) {
  evt.preventDefault();
  evt.stopPropagation();
}