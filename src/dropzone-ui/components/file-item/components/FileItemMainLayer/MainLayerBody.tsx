import * as React from "react";
export type MainLayerBodyProps ={
    open:boolean;
}
const MainLayerBody:React.FC<MainLayerBodyProps> = (props:MainLayerBodyProps) =>{
    const {open} = props;
    return(
        <React.Fragment>
            {open?
            <div></div>
            :
<div></div>
            }
        
        </React.Fragment>
    )
}
export default MainLayerBody;