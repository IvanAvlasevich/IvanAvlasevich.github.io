import Card from "../Card/Card";
import React from "react";
import AppContext from "../../context";

const Home = (
  {cards, 
  searchValue, 
  setSearchValue, 
  onChangeSearchInput, 
  onAddToCart, 
  onAddToFavorite, 
  cartItems,
  isLoading}
  ) => {
  

  
  const renderItems = () => {
    return(
      (isLoading) ? (Array(8).fill(<Card loading={isLoading}/>)):(// Если true - создается фейковый массив 8-эл для отображения Skeleton
        cards
        .filter(obj => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
        /* filter для поиска кроссовок, toLowerCase - нижний регистр */
        .map((obj,index) => (
        <Card 
          key={index}//уникальное значение для отрисовки
          id = {obj.id}
          title = {obj.title} 
          price = {obj.price} 
          imgUrl = {obj.imgUrl} 
          parentId = {obj.parentId}
          // {...obj} //ПЕРЕДАЁМ СВОЙСТВА ОБЪЕКТА КОНКАТЕНАЦИЕЙ
          onPlus={(item) => onAddToCart(item)} 
          onFavorite={(item) => onAddToFavorite(item)}  
         // added={isItemsAdded(obj && obj.id)} //- передается контекстом
          //если id совпали тогда true (зеленая кнопка даже при обновлении стр)
          loading={isLoading}
        />
        )
          )
            )
              )
                }
    
  return (
    <div className="content">   {/* Иконки кроссовок без анимации и H1 */}
    <div className="d-flex align-center justify-between mb-40">
      <h1>{searchValue ? `Поиск по запросу: "${searchValue}"`:'Все кроссовки'}</h1>
     
      <div className="search_block">
        <img src="/img/search.svg" alt="search" />
        <input placeholder="Поиск..." onChange={onChangeSearchInput} value={searchValue} />
        {searchValue && <img className="clear cu-p"
        src="/img/close.svg" 
        alt="close"
        onClick={()=> setSearchValue('')}
         /> }
      </div>
    </div>
{/* ПЕРВЫЙ РЯД */}
{/* Пропсы передаются объектами */}
    <div className="d-flex flex-wrap">
      {renderItems()}
    </div>
  </div>
  )
}

export default Home;