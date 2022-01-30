import { asureColor, colourNameToHex, hexColorToRGB } from "../../base";

export function createRipple<
  T extends HTMLButtonElement | HTMLAnchorElement | HTMLDivElement
>(event: React.MouseEvent<T, MouseEvent>, color: string) {
  const buttonAnchorDiv = event.currentTarget;
  /// look for it!!!!!!!!!!!!!
  const htmlObject: HTMLElement | null = document.getElementById("dui-ripple");
  if (htmlObject) {
    buttonAnchorDiv.removeChild(htmlObject);
  }
  const circle: HTMLSpanElement = document.createElement("span");
  circle.id = "dui-ripple";
  const diameter = Math.max(
    buttonAnchorDiv.clientWidth,
    buttonAnchorDiv.clientHeight
  );
  const radius: number = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - buttonAnchorDiv.offsetLeft - radius
    }px`;
  circle.style.top = `${event.clientY - buttonAnchorDiv.offsetTop - radius}px`;
  circle.classList.add("ripple");

  circle.style.backgroundColor = hexColorToRGB(
    asureColor(colourNameToHex(color)),
    0.4
  );

  const ripple = buttonAnchorDiv.getElementsByClassName("ripple")[0];
  if (ripple) {
    ripple.remove();
  }
  buttonAnchorDiv.appendChild(circle);
}


export function createRippleFromElement<
  T extends HTMLButtonElement | HTMLAnchorElement | HTMLDivElement
>(element: HTMLDivElement | null, event: React.MouseEvent<T, MouseEvent>, color: string) {
  if (!element) {
    return;
  }
  const buttonAnchorDiv = element;
  buttonAnchorDiv.style.height = "100%";
  buttonAnchorDiv.style.width = "100%";
  const circle: HTMLSpanElement = document.createElement("span");
  const diameter = Math.max(
    buttonAnchorDiv.clientWidth,
    buttonAnchorDiv.clientHeight
  );
  const radius: number = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - buttonAnchorDiv.offsetLeft - radius
    }px`;
  circle.style.top = `${event.clientY - buttonAnchorDiv.offsetTop - radius}px`;
  circle.classList.add("ripple");

  circle.style.backgroundColor = hexColorToRGB(
    asureColor(colourNameToHex(color)),
    0.4
  );

  const ripple = buttonAnchorDiv.getElementsByClassName("ripple")[0];
  if (ripple) {
    ripple.remove();
  }
  buttonAnchorDiv.appendChild(circle);
  setTimeout(() => {
    buttonAnchorDiv.style.height = "0%";
    buttonAnchorDiv.style.width = "0%";
  }, 500);
}
