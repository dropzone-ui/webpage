export const cleanInput=(inputElement: HTMLInputElement | null)=>{
    if(inputElement){
        inputElement.value="";
    }
}