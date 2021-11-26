import React, { useEffect, useRef } from "react";

const Donate = (props) => {
  const scriptRef = useRef(null);

  const renderButton = () => {
    console.log("Empezando render button", window.PayPal);
    window.PayPal.Donation.Button({
      env: "production",
      hosted_button_id: "HHB6BJNNXQTPW",
      image: {
        src: "https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif",
        alt: "Donate with PayPal button",
        title: "PayPal - The safer, easier way to pay online!",
      },
    }).render("#donate-button");
  };
  const createScript = () => {
    const existingScript = document.getElementById("paypalButton");
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://www.paypalobjects.com/donate/sdk/donate-sdk.js";
      script.id = "paypalButton";
      scriptRef.current.appendChild(script);

      script.onload = () => {
        if (renderButton) renderButton();
      };
    }
  };
  const loadButton = async () => {
    createScript();
  };
  useEffect(() => {
    loadButton();
    // eslint-disable-next-line
  }, []);
  return (
    <div style={{ width:"100%",display: "flex", alignItems: "flex-start", padding:"28px", flexDirection:"column" }}>
      <h1 style={{ textAlign: "left" }}>Donate</h1>
      <p style={{fontSize:"1.3em"}}>
        A small gift of $5 will provide developers a healthy lunch or a great
        cup of coffee to continue improving the project :D.
      </p>
      <div ref={scriptRef}></div>
      <div id="donate-button-container" style={{width:"100%",display: "flex", alignItems: "center" , margin:"15px 0"}}>
        <div id="donate-button"></div>
      </div>
    </div>
  );
};
export default Donate;
