import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Success from "./pages/Success";
import {useSelector} from "react-redux";

function App() {
  const user = useSelector(state => state.user.currentUser);
  return (
    <Router>
      <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="products/:category" element={<ProductList />}/>
          <Route path="product/:id" element={ <Product /> }/>
          <Route path="cart" element={ <Cart /> }/>
          <Route path="success" element={ <Success /> }/>
          <Route path="login" element={ user ? <Navigate to="/" replace={true} /> : <Login /> }/>
          <Route path="register" element={user ? <Navigate to="/" replace={true} /> : <Register />}/>
          
      </Routes>
    </Router>
  );
}

export default App;
