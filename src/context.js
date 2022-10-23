import React from "react";
//чтобы не делать передачу пропс цепочкой между компонентами(props drilling)(addToFavorite, addToCart)
//используется useContext(как отдельное хранилище данных к которому обращаются компоненты)
//создаем об-т AppContext для храненния и делаем экспорт для доступности с других компонентов

const AppContext = React.createContext({});

export default AppContext;