export const makeFileList = (myFileArray) => {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");
    input.style.display="none";
    const label = document.createElement("label");
    label.style.display="none";
    const text = document.createTextNode("click to set files\n");
    const form = document.createElement("form");
    const data = myFileArray;
    // https://github.com/w3c/clipboard-apis/issues/33
    class _DataTransfer {
      constructor() {
        return new ClipboardEvent("").clipboardData || new DataTransfer();
      }
    }
    input.type = "file";
    input.name = "files[]";
    input.multiple = true;
    input.id = "files";
    text.textContent = text.textContent.concat(
      data.map(({ name }) => name).join(", "),
      "\n"
    );

    label.appendChild(text);
    form.appendChild(label);
    form.appendChild(input);
    document.body.appendChild(form);
    // https://github.com/whatwg/html/issues/3222
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1416488
    label.onclick = (e) => {
      const dt = new _DataTransfer();
      for (let file of data) {
        dt.items.add(file);
      }
      if (dt.files.length) {
        input.files = dt.files;
      }
      const fd = new FormData(form);
      for (const file of input.files) {
        //console.log(file); // `File` objects set at `data`
      }
      for (const [key, prop] of fd) {
       // console.log(key, prop);
      }
      //console.log(input.files);
      resolve(input.files);
    };
    // not dispatched at Firefox 57 when set using `input.files = dt.files`
    input.onchange = (e) => {
      console.log("onchange", e, input.files);
      //resolve("onchange", input.files);
    };
    label.click();
  });
};
