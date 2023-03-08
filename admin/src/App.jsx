import React from "react";
import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import "./app.css";
import Home from "./pages/home/Home";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";


function App() {
    let admin;
    if(JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser == null){
        admin = false
    } else {
        if (JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.others.isAdmin !== null) {
            admin = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.others.isAdmin;
        } 
    }
    
  return (
    <Router>
            {admin ?
                (<>
                <Topbar/>
                
                <div className="container">
                    <Sidebar />
                    <Routes>
                    <Route exact path="/" element={<Home />} />
                        
                    <Route exact path="/users" element={ <UserList />} />

                    <Route exact path="/user/:userId"  element ={<User />} />

                    <Route exact path="/newUser" element={<NewUser />} />
                        
                    <Route exact path="/products" element={ <ProductList />} />
                        
                    <Route exact path="/product/:productId" element={ <Product />} />
                        
                    <Route exact path="/newProduct" element={ <NewProduct />} />
                    </Routes>
                </div>
                </>)
                :
                (
                <Routes>
                <Route exact path="/login" element={<Login />}></Route>
                </Routes> 
                )
                }
                
            
    </Router>
  );
}

export default App;
