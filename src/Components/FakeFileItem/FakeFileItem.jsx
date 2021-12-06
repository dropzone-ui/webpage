import { DynamiCSS } from "@dynamicss/dynamicss";
import React, { useEffect, useRef, useState } from "react";
//import "./FakeFileItem.scss";
const FakeFileItem = () => {
  const containerRef = useRef(null);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  function getPos(el) {
    // yay readability
    for (var lx=0, ly=0;
         el != null;
         lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
    return {x: lx,y: ly};
}
  const init = () => {
    const offsets = getPos(containerRef);
    //console.log("top", offsets.x);
    //console.log("left", offsets.y);
    setLeft(offsets.x);
    setTop(offsets.y);
  };

  const setStyles = (top, left) => {
    const styleSheet = DynamiCSS.makeStyleSheet({
      id: "tooltip",
      sheetRules: [],
      raw: `
      .fi-container {
        width: 133px;
        height: 133px;
        background-color: green;
        position: relative;
        // display: inline-block;
      }
      .fi-container:hover {
        z-index: 1000;
      }
      .fi-container:hover .fi-tooltip {
        opacity: 1;
        pointer-events: auto;
        display: block;
      }
      .fi-tooltip {
        z-index: 1000;
        position: absolute;
        display: none;
        opacity: 0;
        transition: opacity 0.3s ease;
        border-radius: 8px;
        font-size: 13px;
        top: ${top+133}px;
        left: ${left}px;
        width: 133px;
        background: linear-gradient(to bottom, #be2626, #a92222);
        padding: 0.5em 1.2em;
        color: aliceblue;
       
      }
      .fi-tooltip::after {
          content: "";
          position: absolute;
          top: -6px;
          left: 64px;
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-bottom: 6px solid #be2626;
        }
          
         `,
    });
    DynamiCSS.insertStyleSheet(styleSheet);
  };
  useEffect(() => {
    if (top !== 0 && left !== 0) {
      setStyles(top, left);
    }
    return ()=>{
        DynamiCSS.removeStyleSheet("tooltip");
    }
    // eslint-disable-next-line
  }, [top, left]);
  useEffect(() => {
    init();
    // eslint-disable-next-line
  }, []);
  
  return (
    <div className="fi-container" ref={containerRef}>
      <div className="fi-tooltip">este es un mensaje en el tooltip</div>
    </div>
  );
};
export default FakeFileItem;
