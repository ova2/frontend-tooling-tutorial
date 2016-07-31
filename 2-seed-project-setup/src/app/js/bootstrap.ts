import "./../css/entry.scss";
import "./../img/logo.png";

import Application from "./main/main";

document.addEventListener("DOMContentLoaded", function (event) {
    let app = new Application(".greeting");
    app.showHello("TypeScript!");
});
