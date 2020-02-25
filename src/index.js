import React from "react";
import ReactDOM from "react-dom";
import Shotterud from "./views/Shotterud/Shotterud";

const bodyScrollLock = require("body-scroll-lock");
const disableBodyScroll = bodyScrollLock.disableBodyScroll;

const targetElement = document.querySelector("#root");

// 3. ...in some event handler after showing the target element...disable body scroll
disableBodyScroll(targetElement);

ReactDOM.render(<Shotterud />, document.getElementById("root"));
