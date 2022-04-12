import { hexColorToRGB, asureColor, colourNameToHex } from "@dropzone-ui/core";
const removeRippleIfExist = (
  duiContainer: HTMLDivElement | HTMLButtonElement | HTMLAnchorElement,
  className: string
): void => {
  const htmlObject: HTMLElement | null = document.getElementById(className);
  //just in case
  if (htmlObject) {
    duiContainer.removeChild(htmlObject);
    console.log("removing ripple");
  }
}
const asureRippleColor = (color: string): string => {
  return hexColorToRGB(
    asureColor(colourNameToHex(color)),
    0.4
  );
}
/**
 * 
 * @param duiContainerAbs html element
 * @param duiContainerRel  html element
 * @param color the color of the ripple
 * @returns 
 */
export function createDuiRippleFromDiv2
  <T extends HTMLButtonElement | HTMLAnchorElement | HTMLDivElement>
  (
    duiContainerAbs: T | null,
    duiContainerRel: T | null,
    color: string
  ) {
  if (!duiContainerRel || !duiContainerAbs) return;
  duiContainerAbs.style.display = "block";
  //removeRippleIfExist(duiContainerRel, "dui-ripple");
  // creating the span circle ripple
  const circle: HTMLSpanElement = document.createElement("span");
  //for searching
  circle.id = "dui-ripple";
  //for styles
  circle.className = "ripple";
  // calculates the diameter
  const diameter: number = Math.max(
    duiContainerRel.clientWidth,
    duiContainerRel.clientHeight
  );
  const rippleCircleRadius: number = diameter / 2;
  console.log("w,h", duiContainerRel.clientWidth, duiContainerRel.clientHeight);
  circle.style.width = circle.style.height = `${diameter}px`;
  /*   circle.style.left = `${rippleCircleRadius}px`;
    circle.style.top = `${rippleCircleRadius}px`; */
  /*   circle.style.left = `${0}px`;
    circle.style.top = `${0}px`; */
  circle.style.backgroundColor = asureRippleColor(color);

  duiContainerRel.appendChild(circle);
  setTimeout(() => {
    duiContainerAbs.style.display = "none";
    circle?.remove();
  }, 501);
}

export function createDuiRippleFromDiv
  <T extends HTMLButtonElement | HTMLAnchorElement | HTMLDivElement>
  (
    duiContainer: T | null,
    color: string
  ) {
  if (!duiContainer) { return; }
  removeRippleIfExist(duiContainer, "dui-ripple");
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
  console.log("w,h", duiContainer.clientWidth, duiContainer.clientHeight);
  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${rippleCircleRadius}px`;
  circle.style.top = `${rippleCircleRadius}px`;
  /*   circle.style.left = `${0}px`;
    circle.style.top = `${0}px`; */
  circle.style.backgroundColor = asureRippleColor(color);
  duiContainer.style.display = "block";
  duiContainer.appendChild(circle);
  setTimeout(() => {
    duiContainer.style.display = "none";
    circle?.remove();
  }, 500);
}
/**
 * Creates a ripple inside an HTML element
 * @param event event that produces the ripple in the HTML element
 * @param color color of the ripple
 */
export function createDuiRipple
  <T extends HTMLButtonElement | HTMLAnchorElement | HTMLDivElement>
  (
    event: React.MouseEvent<T, MouseEvent>,
    color: string
  ) {
  //const elementContainer = event.currentTarget;
  const duiContainer: HTMLDivElement | HTMLButtonElement | HTMLAnchorElement = event.currentTarget;
  removeRippleIfExist(duiContainer, "dui-ripple");

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
  console.log("w,h", duiContainer.clientWidth, duiContainer.clientHeight);
  circle.style.width = circle.style.height = `${diameter}px`;
  /*   circle.style.left = `${event.clientX - rippleCircleRadius
      }px`;
    circle.style.top = `${event.clientY - rippleCircleRadius}px`; */
  /*   circle.style.left = `${0}px`;
    circle.style.top = `${0}px`; */
  circle.style.backgroundColor = hexColorToRGB(
    asureColor(colourNameToHex(color)),
    0.4
  );
  duiContainer.appendChild(circle);
  setTimeout(() => {
    //elementContainer.style.display = "none";
    circle?.remove();
  }, 500);
}

/**
 * 
 * @param duiContainer eleemnt
 * @param color the color theme
 */
export function createDuiRippleFromElement
  <T extends HTMLButtonElement | HTMLAnchorElement | HTMLDivElement>
  (
    duiContainer: T | null,
    color: string
  ) {
  if (!duiContainer) {
    return;
  }
  removeRippleIfExist(duiContainer, "dui-ripple");
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
  circle.style.width = circle.style.height = `${diameter}px`;
  //removes width and left due to display flex
  circle.style.backgroundColor = asureRippleColor(color);

  duiContainer.appendChild(circle);
  setTimeout(() => {
    circle?.remove();
  }, 501);
}









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
  //circle.style.top = `${event.clientY - buttonAnchorDiv.offsetTop - radius}px`;
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

/**
 * 
 * @param element the HTML element
 * @param event the mouse event that produces the ripple
 * @param color the color of the ripple
 * @returns 
 */
export function createRippleFromElementV3<
  T extends HTMLButtonElement | HTMLAnchorElement | HTMLDivElement
>(elementContainer: T | null, color: string) {
  if (!elementContainer) {
    return;
  }

  const duiContainer: T = elementContainer;

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
  circle.style.left = `${0}px`;
  circle.style.top = `${0}px`;
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


export function createRippleFromElementV4<
  T extends HTMLButtonElement | HTMLAnchorElement | HTMLDivElement
>(element: HTMLDivElement | null, event: React.MouseEvent<T, MouseEvent>, color: string) {
  if (!element) {
    return;
  }
  const duiContainer: HTMLDivElement | HTMLButtonElement | HTMLAnchorElement = element;
  // duiContainer.style.display = "block";
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
    // duiContainer.style.display = "none";
    circle?.remove();
  }, 500);
}
