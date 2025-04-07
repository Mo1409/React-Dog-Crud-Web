import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListAnimals from "./pages/ListAnimals";
import AnimalDetails from "./pages/AnimalDetails";
import CreateAnimal from "./pages/CreateAnimal";
import UpdateAnimal from "./pages/UpdateAnimal";
import "./App.css";

/**
 * Configuração de rotas da aplicação (SPA),
 * definindo cada página principal:
 *  - "/" -> Lista de animais
 *  - "/details/:id" -> Detalhes do animal
 *  - "/create" -> Cadastro de novo animal
 *  - "/edit/:id" -> Edição de um animal existente
 */
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListAnimals />} />
        <Route path="/details/:id" element={<AnimalDetails />} />
        <Route path="/create" element={<CreateAnimal />} />
        <Route path="/edit/:id" element={<UpdateAnimal />} />
      </Routes>
    </Router>
  );
}
