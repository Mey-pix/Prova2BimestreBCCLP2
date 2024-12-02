import TelaMenu from "./Componentes/Tela/TelaMenu";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TelaLogin from "./Componentes/Tela/TelaLogin";
import Tela404 from "./Componentes/Tela/Tela404";
import { useState, createContext } from 'react';
import store from "./Redux/store";
import { Provider } from "react-redux"
import TelaCadastroUsuario from "./Componentes/Tela/TelaCadastroUsuario";

export const ContextoUsuario = createContext();
function App() {
  const [usuario, setUsuario] = useState({
    "usuario": "",
    "logado": false
  });
  if (!usuario.logado) {
    return (
      <ContextoUsuario.Provider value={{ usuario, setUsuario }}>
        <TelaLogin />
      </ContextoUsuario.Provider>
    );
  }
  else {
    return (
      <div className="App">
        <Provider store={store}>
          <ContextoUsuario.Provider value={{ usuario, setUsuario }}>
            <BrowserRouter>
              { //A ordem das rotas é importante 
              }
              <Routes>
                <Route path="/usuario" element={<TelaCadastroUsuario />} />
                <Route path="/" element={<TelaMenu />} />
                <Route path="*" element={<Tela404 />} />
              </Routes>
            </BrowserRouter>
          </ContextoUsuario.Provider>
        </Provider>
      </div>
    );
  }
}

export default App;
