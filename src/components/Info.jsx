import React from 'react';
import AppContext from "../context"

const Info = ({title, image, description}) => {
  const {setCartOpened} = React.useContext(AppContext);



  return (
    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
      <img className="mb-20" width='120px'   src={image} alt="cart-box" />
      <h2>{title}</h2>
      <p className="opacity-6 mb-5"> {description} </p>

      <button onClick={() => setCartOpened(false)} >
        <img src="/img/arrow.svg" alt="arrow" />
        Вернуться назад 
      </button>     
    </div>
  )
}

export default Info;