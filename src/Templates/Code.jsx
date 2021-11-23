import { Highlighter } from "@unlimited-react-components/react-highlight";
import { Fragment } from "react";


const App = (props) => {
  return (
    <Fragment>
      <h1 align="center">This is the sample:</h1>
      <Highlighter
        //code={makeCode}
        style={{ margin: "2%" }}
      >
        {makeCode}
      </Highlighter>
    </Fragment>
  );
};
export default App;

const makeCode = `
    // this is a sample code
    import React from "react";
    
    const themes = {
      light: {
        foreground: "#000000",
        background: "#eeeeee"
      },
      dark: {
        foreground: "#ffffff",
        background: "#222222"
      }
    };
    
    const ThemeContext = React.createContext( themes.light );
    
    function App() {
      return (
        <ThemeContext.Provider value={ themes.dark }>
          <Toolbar />
        </ThemeContext.Provider>
      );
    }
    
    function Toolbar(props) {
      return (
        <div>
          <ThemedButton />
        </div>
      );
    }
    
    const ThemedButton =() => {
      const theme = useContext(ThemeContext);  
      return (    
        <button style=
        {{ background: theme.background, 
            color: theme.foreground }}
        >      
         { "I am styled by theme context! " }  
        </button>  
      );
    } 
    
`;
