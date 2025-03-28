import TelJs from "/TelJs.js";

let telegram = new TelJs(
  "7625182592:AAGX0jkcydTx7NG2e2X3zkUvnOMmK5DeS9s",
  "-1002192270366"
);

document.querySelector("button").addEventListener("click", () => {
  telegram.send(`helloooooo`).then((result) => {
    console.log(result);
  });
}); 
