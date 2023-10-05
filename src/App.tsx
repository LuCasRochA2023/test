
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header/header';
import { RecoilRoot } from 'recoil';
import Formulario from './components/Formulario';
import Configuracao from './paginas/configuracao';

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Routes>
          <Route path='/' element={<Configuracao/>}/>
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  )
}

export default App;
