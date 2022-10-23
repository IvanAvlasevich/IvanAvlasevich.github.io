import React, {useState} from "react"
import { useEffect } from "react";
import cardStyles from "./Card.module.scss"
import ContentLoader from "react-content-loader"
import AppContext from "../../context"

const Card = ({ 
  id, 
  title, 
  imgUrl, 
  price, 
  onPlus, 
  onFavorite, 
  favorited = false, 
  added = false,
  loading = false  }) => {
  
  const {isItemsAdded} = React.useContext(AppContext);
  //const [isAdded, setIsAdded] = useState(added);
  const [isFavorite, setIsFavorite] = useState(favorited);

  console.log(title, isItemsAdded(id))

  const itemObj = {id, parentId:id, title, imgUrl, price};

  const onClickFavorite = () => {
    onFavorite(itemObj)
    setIsFavorite(!isFavorite);
  }

  const onClickPlus = () => {
    onPlus(itemObj);
    //setIsAdded(!isAdded);//функция сетизаддед  присваивает новое состояние для переменной изаддед
  }

  // useEffect(() => { //Выполняет код, когда значение в переменной, пропсе, стэйте изменилось
  //   console.log ("Переменная изменилась")//сам код
  // }, [isAdded]); //в какой переменной отслеживаем изменение

  return (
    <div className={cardStyles.card}>
    {
      loading ? (
  <>{/* React Skeleton */}
    <ContentLoader 
      speed={2}
      width={155}
      height={250}
      viewBox="0 0 155 250"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"  
    >
      <rect x="0" y="0" rx="10" ry="10" width="150" height="125" /> 
      <rect x="0" y="155" rx="5" ry="5" width="150" height="10" /> 
      <rect x="0" y="175" rx="5" ry="5" width="93" height="10" /> 
      <rect x="0" y="210" rx="10" ry="10" width="100" height="30" /> 
      <rect x="120" y="210" rx="10" ry="10" width="30" height="30" />
    </ContentLoader>
  </>
) : (            
            <>
            <div className={cardStyles.favorite} >
            {onFavorite &&  <img 
                              onClick={onClickFavorite} 
                              src={isFavorite ? "/img/heart-liked.svg":"/img/heart-unliked.svg" }  
                              alt="Liked" 
                            />
            }
            </div>
            <img width={133} height={112} src={imgUrl} alt="card" />
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
              <div className="d-flex flex-column">
                <span>Цена:</span>
                <b>{price} руб.</b>
                </div>
              {/* <button className="button" onClick={props.onClickPlus}> */}
              {onPlus && <img 
                            className={cardStyles.plus} 
                            onClick={onClickPlus} 
                            src={isItemsAdded(id) ? "/img/btn-checked.svg":"/img/plus.svg" } 
                            alt="plus" 
                          />
              }
              {/* </button> */}
            </div>
            </>
)
    }
  </div>
  )
}

export default Card

