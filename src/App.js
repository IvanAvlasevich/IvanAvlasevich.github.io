import Header from "./components/Header";
import cardStyles from "../src/components/Card/Card.module.scss"
import Drawer from "./components/Drawer";
import React, {useState} from "react";
import axios from 'axios';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Home from "./components/pages/Home";
import Favorite from "./components/pages/Favorite";
import { createContext } from "react";
import AppContext from "./context";
import Orders from "./components/pages/Orders";




const App = () => {
  
  const [cartOpened, setCartOpened] = useState (false);//Открытие корзины и закрытие
  const [cards, setCards] = useState ([]);// для карточек,хранящихся на бэкенде(fetch)
  const [cartItems, setCartItems] = useState([]);//Для хранения товаров в корзине(добавления)(useContext)
  const [favorites, setFavorites] = useState([]);//для закладок избранное
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  // достать массив объектов из бэкэнда - useEffect + axios библиотека
  //либо fetch(позволяет отправлять запросы на серверную часть)
  
 //запрос только при первом рендере (если cartOpened или cards обновились не вызывай fetch)
      // fetch('https://630d1b8eb37c364eb7003a68.mockapi.io/cards').then (response =>{
      // return response.json();
      // }).then (json => {
      // console.log(json);
      // setCards(json);
      // });
      React.useEffect(() => { 
        try {
          setIsLoading(true);//отрисовка скелетона
          axios.get('https://630d1b8eb37c364eb7003a68.mockapi.io/cart').then((res)=>{setCartItems(res.data)});
          axios.get('https://630d1b8eb37c364eb7003a68.mockapi.io/favorite').then((res)=>{setFavorites(res.data)});
          axios.get('https://630d1b8eb37c364eb7003a68.mockapi.io/cards').then((res)=>{setCards(res.data)}).then(()=>setIsLoading(false));    
        } 
        catch (error) {
          alert('Ошибка при запросе данных :(')          
          console.error(error)
        }
   
    //fetchData ();
  },[]);
    
//   async function fetchData () { //используем асинхронную функцию для первичной прогрузки корзины и избранного 
//     //Всё то же самое что и на fetch
//     //fetch возвращает промис в json формате(без этого не получится вытащить массив) 
//     const cartResponse =  axios.get('https://630d1b8eb37c364eb7003a68.mockapi.io/cart');
//     const favoriteResponse =  axios.get('https://630d1b8eb37c364eb7003a68.mockapi.io/favorite');
//     const cardsResponse =  axios.get('https://630d1b8eb37c364eb7003a68.mockapi.io/cards');
//     setCartItems(cartResponse.data)
//     setFavorites(favoriteResponse.data)
//     setCards(cardsResponse.cards);
//     setIsLoading(false);//отрисовка карточек
// } 

  const onAddToCart = (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id))
      if (findItem) {
        setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
        axios.delete(`https://630d1b8eb37c364eb7003a68.mockapi.io/cart/${findItem.id}`);
      }
      else{
        setCartItems((prev) =>[...prev,obj] );
        axios.post('https://630d1b8eb37c364eb7003a68.mockapi.io/cart', obj);
        //.then((res)=>{setCartItems((prev) =>[...prev,res.data] )} )
      }
      
    } 
    catch (error) {
      alert ('Ошибка при добавлении в корзину')
      console.error(error)
    }
   
  }; 
        //переносим кроссы в бэк
        //в реакте метод push для массива не используется
        // нужно делать замену на новые
        // set функция - может принимать как данные, так и функции
        // prev -> preview state(предыдущее состояние)

  const onAddToFavorite =  (parameters) => {
    try {
      if (favorites.find((obj) => obj.id === parameters.id)) {
        axios.delete(`https://630d1b8eb37c364eb7003a68.mockapi.io/favorite/${parameters.id}`).then(()=>{
          setFavorites((prev) => prev.filter((item) => item.id !== parameters.id))})
        
      } else {
        axios.post('https://630d1b8eb37c364eb7003a68.mockapi.io/favorite', parameters).then((res) => {
          setFavorites((prev) =>[...prev,res.data] )} )
        //вместо then можно использовать async (асинхронность) ... await 
        // при использовании async..await использовать try..catch для отлова ошибок
      }  
    } catch (error) {
      alert ('Ошибка при добавлении в избранное')
      console.error(error)
    }
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://630d1b8eb37c364eb7003a68.mockapi.io/cart/${id}`);//удаляем с бэка
      setCartItems((prev) => prev.filter((obj) => obj.id !== id));//отобразить все эл-ты с id не равным нужному
    } catch (error) {
      alert ('Ошибка при удалении из корзины')
      console.error(error)
    }
      }

  const isItemsAdded = (id ) => { //проверка наличия кроссовок в корзине с передачей функции в контекст
    console.log(cartItems,222);
    return cartItems.some((item) => Number(item.parentId) === Number(id) )}

  return (  
    <AppContext.Provider value={ {cards, cartItems, favorites, isItemsAdded, setCartOpened, setCartItems,onAddToCart, onAddToFavorite} }> 
        {/* использование контекста для ререндера */}
        {/* в объекте AppContext обр. к св-ву Provider (компоненту)  */}
      <div className="wrapper clear">
        {/* {cartOpened ? <Drawer items={cartItems} onClickClose= {() => {setCartOpened(false)}}  /> :null }  закрытие корзины */}
        {cartOpened && <Drawer 
          items={cartItems} 
          onClickClose= {() => {setCartOpened(false)}} 
          onRemove={onRemoveItem}
        />}
        <Header onClickCart = {()=>{setCartOpened(true)}}/> {/*при клике на корзину открывает содержимое*/}
        <div className={cardStyles.board}>
          <div className="frog_logo">
            <img  src="/img/frog_logo.png" alt="frog_logo"/>
            <h2> Stan Smith,</h2>
            <p> Forever!</p>
          </div>
          <img className="frog" src="/img/frog.png" alt="frog" />
         

        </div>
        <div>
          <Routes>
            <Route path ='/' exact element = {
              <Home 
                cards = {cards} 
                cartItems = {cartItems}
                searchValue = {searchValue} 
                setSearchValue = {setSearchValue} 
                onChangeSearchInput = {onChangeSearchInput} 
                onAddToCart = {onAddToCart} 
                onAddToFavorite = {onAddToFavorite}
                isLoading = {isLoading} 
              />
            }/> 
            {/* Для передачи переменных в Home используется useContext */}
            <Route path='/favorite' exact element={
              <Favorite 
                //cards={favorites} 
                onAddToCart={onAddToCart} 
                onAddToFavorite={onAddToFavorite}
              />
            }/> 
            <Route path='/orders' exact element={
              <Orders 
                //cards={favorites} 
                onAddToCart={onAddToCart} 
                onAddToFavorite={onAddToFavorite}
              />
            }/> 
          </Routes>  
        </div> 
      </div>
    </AppContext.Provider>
  )
}

export default App;
