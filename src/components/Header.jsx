import {Link, Route, Routes} from "react-router-dom";
import React from "react";
import { useCart } from "./hooks/useCart";

const Header = (props) => {

  const {totalPrice} = useCart();



  return (
    <header>
        <Link to='/'>
          <div className="headerLeft">
            <img width={40} height={40} src="/img/logo_sneakers.png" alt="logo_sneakers"/>
            <div className="headerInfo">
              <h3>React Sneacers</h3>
              <p>Магазин лучших кроссовок</p>
            </div>
          </div>
        </Link>
        <ul className="headerRight">
          <li className="header_li cu-p" onClick={props.onClickCart}>
            <img width={18} height={18} src="/img/cart.svg" alt="Cart"/>
            <span>{totalPrice} pуб.</span>
          </li>
          <li>
            <Link to='/favorite'>
              <img width={18} height={18} src="/img/favorite_header.svg"  alt="Saved"/>
            </Link>
          </li>
          <li>
            <Link to='/orders'>
              <img width={18} height={18} src="/img/user.svg"  alt="User"/>
            </Link>
          </li>
        </ul>

      </header>
  )
}

export default Header;