import TelJs from "/TelJs.js";

let telegram = new TelJs("7625182592:AAGX0jkcydTx7NG2e2X3zkUvnOMmK5DeS9s", "-1002192270366")

telegram.send(`<b> hello </b>`).then((result) => {
    console.log(result);
})  