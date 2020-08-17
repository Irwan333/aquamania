import React, { Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./auth/Signup";
import Signin from "./auth/Signin";
import SigninAdmin from "./auth/SigninAdmin";
import Forgot from "./auth/Forgot";
import Reset from "./auth/Reset";
import Activate from "./auth/activate";
import Profile from "./user/Profile";
import Users from "./user/User";
import EditProfile from "./user/EditProfile";
import PrivateRoute from "./helper/PrivateRoute";
import FindPeople from "./user/FindPeople";
import Post from "./post/Posts";
import NewPost from "./post/NewPost";
import EditPost from "./post/EditPost";
import SinglePost from "./post/SinglePost";
import Invoice from "./user/Invoice";
import AdminRoute from "./helper/AdminRoute";
import UserDashboard from "./user/UserDashboard";
import Admin from "./admin/Admin";
import AdminDashboard from "./admin/AdminDashboard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import Shop from "./product/Shop";
import Product from "./product/Product";
import Cart from "./product/Cart";
import Orders from "./admin/Orders";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import UpdateCategory from "./admin/UpdateCategory";
import Report from "./admin/Report";

const Router = () => (
  <Fragment>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/shop" exact component={Shop} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
        <Route path="/admin/signin" exact component={SigninAdmin} />
        <Route path="/post" exact component={Post} />
        <PrivateRoute path="/post/create" exact component={NewPost} />
        <Route path="/post/:postId" exact component={SinglePost} />
        <PrivateRoute path="/invoice/:orderId" exact component={Invoice} />
        <PrivateRoute path="/post/edit/:postId" exact component={EditPost} />
        <Route path="/users" exact component={Users} />
        <PrivateRoute path="/user/edit/:userId" exact component={EditProfile} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/auth/activate/:token" exact component={Activate} />
        <Route path="/auth/password/forgot" exact component={Forgot} />
        <Route path="/auth/password/reset/:token" exact component={Reset} />
        <PrivateRoute path="/findpeople" exact component={FindPeople} />
        <PrivateRoute path="/user/:userId" exact component={Profile} />
        <AdminRoute exact path="/admin" component={Admin} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/create/category" exact component={AddCategory} />
        <AdminRoute path="/create/product" exact component={AddProduct} />
        <AdminRoute path="/admin/report" exact component={Report} />
        <Route path="/product/:productId" exact component={Product} />
        <Route path="/cart" exact component={Cart} />
        <AdminRoute path="/admin/orders" exact component={Orders} />
        <AdminRoute path="/admin/products" exact component={ManageProducts} />
        <AdminRoute
          path="/admin/product/update/:productId"
          exact
          component={UpdateProduct}
        />
        <AdminRoute
          path="/admin/category/update/:categoryId"
          exact
          component={UpdateCategory}
        />
      </Switch>
    </BrowserRouter>
  </Fragment>
);

export default Router;
