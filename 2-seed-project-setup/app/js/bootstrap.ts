import Application from "./main/main";

document.addEventListener("DOMContentLoaded", function (event) {
    let app = new Application(".greeting");
    app.showHello("TypeScript!");
});
