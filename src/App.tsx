import React, { FunctionComponent, ReactNode } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PokemonsList from "./pages/pokemon-list";
import PokemonsDetail from "./pages/pokemon-detail";
import PokemonEdit from "./pages/pokemon-edit";
import PokemonAdd from "./pages/pokemon-add";
import PageNotFound from "./pages/page-not-found";
import Login from "./pages/login";
import { isAuthenticated } from "./services/authService";
import { Provider } from "react-redux";
import store from "./redux/store";
import Layout from "./components/layout";
import './styles.css'

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({ children }) => {
  if (isAuthenticated()) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" replace />;
  }
};

const App: FunctionComponent = () => {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<PrivateRoute children={<PokemonsList />} />} />
            <Route path="/pokemons" element={<PrivateRoute children={<PokemonsList />} />} />
            <Route path="/pokemon/add" element={<PrivateRoute children={<PokemonAdd />} />} />
            <Route path="/pokemons/edit/:id" element={<PrivateRoute children={<PokemonEdit />} />} />
            <Route path="/pokemons/:id" element={<PrivateRoute children={<PokemonsDetail />} />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
};

export default App;
