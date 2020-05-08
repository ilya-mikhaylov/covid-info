import React, { Component } from "react";
import classes from "./PopupButton.module.css";

export default function PopupButton() {
  return (
    <div id="container">
      <div id="buttonBase"></div>
      <div id="buttonBodyCircle"></div>
      <div id="buttonBodySlash"></div>
      <div className={classes.circle}></div>
      <div className={classes.circle} style={{animationDelay: "1s"}}></div>
      <div className={classes.circle} style={{animationDelay: "2s"}}></div>
      <div className={classes.circle} style={{animationDelay: "3s"}}></div>
    </div>
  );
}
