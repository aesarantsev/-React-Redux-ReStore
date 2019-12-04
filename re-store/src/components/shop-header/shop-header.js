import React from "react";
import "./shop-header.css";

const ShopHeader = ({ numItems, total }) => {
  return (
    <header className="shop-header row">
      <a className="logo text-dark" href="#">
        {" "}
        ReStore
      </a>
      <a className="shoping-cart">
        <i className="cart-icon fa fa-shoping-cart" />
        {numItems} items (${total})
      </a>
    </header>
  );
};

export default ShopHeader;
