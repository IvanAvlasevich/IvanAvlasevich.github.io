import Info from "./Info";
import React, {useState} from "react";
import { useCart } from "./hooks/useCart";
import axios from "axios";

const Drawer = ({onClickClose,onRemove, items = [] }) => { //items пустой массив по умолчанию, чтобы отрисовалось

  const [isComplite, setIsComplite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orderID, setOrderID] = useState(null);

  const {cartItems, setCartItems, totalPrice} = useCart();
  
  const onClickOrder = async  () => {
try {
  setIsLoading(true);
  const {data} = await axios.post('https://630d1b8eb37c364eb7003a68.mockapi.io/orders', {items:cartItems,});
  setOrderID(data.id);
  setIsComplite(true);
  setCartItems([]);

  cartItems.forEach(item => {
    axios.delete('https://630d1b8eb37c364eb7003a68.mockapi.io/cart/'+ item.id);
  });
 } catch (error) {
  alert ('Не удалось создать заказ :(')
}
setIsLoading(false);
  }
  
  return(
  <div  className="overlay">
    <div className="drawer"> 
      <h2 className="d-flex justify-between mb-30 mt-5">Корзина 
        <img onClick={onClickClose} className="close cu-p" src="/img/close.svg" alt="Close" />
      </h2>

      {
        (items.length > 0) ? 
        ( 
          <div className="d-flex flex-column flex">
            <div className="items">
              {
              items.map((obj) => (
              <div key={obj.id} className="cartItem d-flex align-center mb-20">
                <img width={70} height={70} src={obj.imgUrl} alt="Sneakers"  className="mr-20"/>
                <div className="mr-20">
                  <p className="mb-5">{obj.title}</p>
                  <b>{obj.price} руб.</b>          
                </div>
                <img className="close" src="/img/close.svg" alt="Close"  onClick={()=>onRemove(obj.id)} />
                                {/* в метод передавать данные только через анонимную функцию(в нашем случае id) */}
              </div>
                  )
                )
              }
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li >
                  <span>Итого</span>
                  <div></div>
                  <b>{totalPrice} руб. </b>
                </li>
                <li >
                  <span>Налог 5%: </span>
                  <div></div>
                  <b>{totalPrice/100*5} руб. </b>
                </li>
              </ul>
              <button disabled={isLoading} onClick={onClickOrder} > Оформить заказ 
                <img src="/img/arrow.svg" alt="arrow" />
              </button>          
            </div>
          </div>
     )  
      :(
          <Info 
            title={isComplite ? "Заказ офрмлен" : "Корзина пустая" }
            image={isComplite ?  "/img/list_chacked.png" : "/img/cart_box.png"}
            description= {isComplite ? `Ваш заказ #${orderID} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ"}
          />
        )
    }





    </div> 
  </div>
  )
}

export default Drawer;