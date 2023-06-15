import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserStore from "./store/UserStore";
import ItemStore from "./store/ItemStore";


const RootStore = {
    user: new UserStore(),
    item: new ItemStore()
}

export const Context = createContext(RootStore)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Context.Provider value={RootStore}>
        <App />
    </Context.Provider>
);
