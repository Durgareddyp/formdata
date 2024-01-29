import React from "react";
import ButtonComponent from "./ButtonComponent";
import "./CSS/style.css";

function HomepageComponent() {
  const style1 = {
    background: "pink",
  };
  return (
    <>
      <h1 className="text-4xl text-center" style={style1}>
        Home Page
      </h1>
      <ButtonComponent />
    </>
  );
}

export default HomepageComponent;
