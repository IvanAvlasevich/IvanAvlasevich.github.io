import Card from "../Card/Card";
import  AppContext from "../../context" //точечный импорт контекста
import React from "react";

const Favorite = ({onAddToCart, onAddToFavorite}) => {
  //вместо передачи-приема пропсов {cards, onAddToCart, onAddToFavorite} используем контекст
  //если в AppContext обновятся - будет ререндер
  const {favorites} = React.useContext(AppContext);//достаем favorites из всего AppContext
console.log(favorites)
  
  return (
    <div className="content">   {/* Иконки кроссовок без анимации и H1 */}
    <div className="d-flex align-center justify-between mb-40">
      <h1>МОИ ЗАКЛАДКИ</h1>
    </div>
{/* ПЕРВЫЙ РЯД */}
{/* Пропсы передаются объектами */}
    <div className="content_card d-flex  flex-wrap">
    {favorites.map((obj,index) =>
     
      <Card 
      key = {index}//уникальное значение для отрисовки
       id = {obj.id}
       title = {obj.title} 
       price = {obj.price} 
       imgUrl = {obj.imgUrl} 
      //{...obj} ПЕРЕДАЁМ СВОЙСТВА ОБЪЕКТА КОНКАТЕНАЦИЕЙ
      favorited = {true}
      onPlus = {(item) => onAddToCart(item) } 
      onFavorite={(item) =>onAddToFavorite (item)}
      
      />)
      }
    </div> 
  </div>
  )
}

export default Favorite;