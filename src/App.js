import { Fragment } from "react";
import "./App.css";

import InteractiveCode from "./Components/CodeGenerator/InteractiveCode";

function App() {

  return (
    <Fragment>
      <div className="dui-main-wrapper"></div>
      <InteractiveCode />
    </Fragment>
  );
}

export default App;
