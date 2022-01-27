import { Button } from "@mui/material";
import * as React from "react";
/* import FullScreen from "../../mega-dropzone-ui/previews/FullScreen/FullScreen";
import ImagePreview from "../../mega-dropzone-ui/previews/ImagePreview/ImagePreview";
 */
const Previews = (props) => {
  const [openFullscreen, setOpenFullScreen] = React.useState(false);
  const [openFullscreen2, setOpenFullScreen2] = React.useState(false);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
    {/*   <Button variant="contained" onClick={() => setOpenFullScreen(true)}>
        open1
      </Button>

      <Button variant="contained" onClick={() => setOpenFullScreen2(true)}>
        open2
      </Button>

      <ImagePreview 
      alt="al anternative text"
      src="https://smedia.istockphoto.com/photos/hot-air-balloons-flying-over-the-botan-canyon-in-turkey-picture-id1297349747?b=1&k=20&m=1297349747&s=170667a&w=0&h=oH31fJty_4xWl_JQ4OIQWZKP8C6ji9Mz7L4XmEnbqRU=" />

      <FullScreen
        open={openFullscreen}
        onClose={() => {
          setOpenFullScreen(false);
        }}
      >
        <div
          style={{
            position: "relative",
            color: "white",
            width: "100%",
            height: "100%",
            border: "1px dashed white",
            padding: "4%",
          }}
        >
          {" "}
          lo que seaaalo que seaaalo que seaaalo que seaaalo que seaaalo que
          seaaalo que seaaalo que seaaalo que seaaalo que seaaa
        </div>
      </FullScreen>

      <FullScreen
        open={openFullscreen2}
        onClose={() => {
          setOpenFullScreen2(false);
        }}
      >
        <ImagePreview src="https://media.istockphoto.com/photos/hot-air-balloons-flying-over-the-botan-canyon-in-turkey-picture-id1297349747?b=1&k=20&m=1297349747&s=170667a&w=0&h=oH31fJty_4xWl_JQ4OIQWZKP8C6ji9Mz7L4XmEnbqRU=" />
      </FullScreen> */}
    </div>
  );
};
export default Previews;
