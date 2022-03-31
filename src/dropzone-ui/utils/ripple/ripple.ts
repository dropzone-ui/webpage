import { hexColorToRGB, asureColor, colourNameToHex } from "@dropzone-ui/core";

/**
 * Creates a ripple inside an HTML element
 * @param event event that produces the ripple in the HTML element
 * @param color color of the ripple
 */
export function createRipple<
  T extends HTMLButtonElement | HTMLAnchorElement | HTMLDivElement
>(event: React.MouseEvent<T, MouseEvent>, color: string) {
  const buttonAnchorDiv = event.currentTarget;
  /// look for it!!!!!!!!!!!!!
  const htmlObject: HTMLElement | null = document.getElementById("dui-ripple");
  // console.log("htmlObject",htmlObject);

  if (htmlObject) {
    buttonAnchorDiv.removeChild(htmlObject);
    console.log("removing");
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

/**
 * 
 * @param element the HTML element
 * @param event the mouse event that produces the ripple
 * @param color the color of the ripple
 * @returns 
 */
export function createRippleFromElement<
  T extends HTMLButtonElement | HTMLAnchorElement | HTMLDivElement
>(element: HTMLDivElement | null, event: React.MouseEvent<T, MouseEvent>, color: string) {
  if (!element) {
    return;
  }
  const duiContainer: HTMLDivElement | HTMLButtonElement | HTMLAnchorElement = element;
  duiContainer.style.display = "block";
  //duiContainer.style.display = "none";
  const htmlObject: HTMLElement | null = document.getElementById("dui-ripple");
  //just in case
  if (htmlObject) {
    duiContainer.removeChild(htmlObject);
    console.log("removing");
  }
  // creating the span circle ripple
  const circle: HTMLSpanElement = document.createElement("span");
  //for searching
  circle.id = "dui-ripple";
  //for styles
  circle.className = "ripple";
  // calculates the diameter
  const diameter: number = Math.max(
    duiContainer.clientWidth,
    duiContainer.clientHeight
  );
  const rippleCircleRadius: number = diameter / 2;
 circle.style.width = circle.style.height = `${diameter}px`;
   
    circle.style.left = `${event.clientX - duiContainer.offsetLeft - rippleCircleRadius
      }px`;
    circle.style.top = `${event.clientY - duiContainer.offsetTop - rippleCircleRadius}px`;
/* 
  circle.style.left = `${event.clientX - rippleCircleRadius}px`;
  circle.style.top = `${event.clientY - rippleCircleRadius}px`; */
/* 
  circle.style.left = `${event.clientX - duiContainer.offsetLeft}px`;
  circle.style.top = `${event.clientY - duiContainer.offsetTop}px`; */
  //circle.classList.add("ripple");


  circle.style.backgroundColor = hexColorToRGB(
    asureColor(colourNameToHex(color)),
    0.4
  );

  const ripple = duiContainer.getElementsByClassName("ripple")[0];
  if (ripple) {
    ripple.remove();
  }
  duiContainer.appendChild(circle);
  setTimeout(() => {
    duiContainer.style.display = "none";
    circle?.remove();
  }, 500);
}

/**
 * 
 * @param element the HTML element
 * @param event the mouse event that produces the ripple
 * @param color the color of the ripple
 * @returns 
 */
export function createRippleFromElementV2<
  T extends HTMLButtonElement | HTMLAnchorElement | HTMLDivElement
>(elementContainer: HTMLDivElement | null, element: HTMLDivElement | null, event: React.MouseEvent<T, MouseEvent>, color: string) {
  if (!element || !elementContainer) {
    return;
  }
  elementContainer.style.display = "block";
  const duiContainer: HTMLDivElement | HTMLButtonElement | HTMLAnchorElement = element;
  //duiContainer.style.display = "block";
  //duiContainer.style.display = "none";
  const htmlObject: HTMLElement | null = document.getElementById("dui-ripple");
  //just in case
  if (htmlObject) {
    duiContainer.removeChild(htmlObject);
    console.log("removing");
  }
  // creating the span circle ripple
  const circle: HTMLSpanElement = document.createElement("span");
  //for searching
  circle.id = "dui-ripple";
  //for styles
  circle.className = "ripple";
  // calculates the diameter
  const diameter: number = Math.max(
    duiContainer.clientWidth,
    duiContainer.clientHeight
  );
  const rippleCircleRadius: number = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - duiContainer.offsetLeft - rippleCircleRadius
    }px`;
  circle.style.top = `${event.clientY - duiContainer.offsetTop - rippleCircleRadius}px`;
  //circle.classList.add("ripple");


  circle.style.backgroundColor = hexColorToRGB(
    asureColor(colourNameToHex(color)),
    0.4
  );


  duiContainer.appendChild(circle);
  setTimeout(() => {
    elementContainer.style.display = "none";
    circle?.remove();
  }, 500);
}