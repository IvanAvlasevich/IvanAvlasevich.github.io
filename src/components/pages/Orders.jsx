import Card from "../Card/Card";
import React, {useState} from "react";
import axios from "axios";
import AppContext from "../../context";

const Orders = () => {
  //вместо передачи-приема пропсов {cards, onAddToCart, onAddToFavorite} используем контекст
  //если в AppContext обновятся - будет ререндер
  const {onAddToCart, onAddToFavorite} = React.useContext(AppContext);
  const [orders, setOrders] = useState([])
  React.useEffect(() => {
    try {
      axios.get('https://630d1b8eb37c364eb7003a68.mockapi.io/orders').then((res)=>{
        setOrders(res.data.map((obj) => obj.items).flat())
      });
    } catch (error) {
      alert('Ошибка при заросе заказов')
    }
    
  },[]);
  
  return (
    <div className="content">   {/* Иконки кроссовок без анимации и H1 */}
    <div className="d-flex align-center justify-between mb-40">
      <h1>МОИ ЗАКАЗЫ</h1>
    </div>
{/* ПЕРВЫЙ РЯД */}
{/* Пропсы передаются объектами */}
    <div className="content_card d-flex  flex-wrap">
    {orders.map((obj,index) =>
     
      <Card 
      key = {index}//уникальное значение для отрисовки
       id = {obj.id}
       title = {obj.title} 
       price = {obj.price} 
       imgUrl = {obj.imgUrl} 
      //{...obj} ПЕРЕДАЁМ СВОЙСТВА ОБЪЕКТА КОНКАТЕНАЦИЕЙ

      
      />)
      }
    </div> 
  </div>
  )
}

export default Orders;