import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory} from 'react-router';
import Template from './Components/Template.jsx';
import Main from './Components/Main.jsx';
import Products from './Components/Products.jsx';
import Product from './Components/Product.jsx';
import Cart from './Components/Cart.jsx';
import Orders from './Components/Orders.jsx'
import Order from './Components/Order.jsx'
import CartForm from "./Components/CartForm.jsx"
require ('../scss/main.scss');
document.addEventListener('DOMContentLoaded', function(){

});
ReactDOM.render (
<Router history={hashHistory}>
    <Route path='/' component={Template}>
    <IndexRoute component={Main} />
          <Route path='/products' component={Products} />
          <Route path='/product/:id' component={Product} />
          <Route path='/cart/:id' component={Cart} />
          <Route path='/orders' component={Orders} />
          <Route path='/order/:id' component={Order} />
          <Route path='/cart/:id/form' component={CartForm} />
          {/*<Route path='/contact' component={Contact} />*/}
          {/*<Route path='*' component={NotFound} />*/}
    </Route>
</Router>,
document.getElementById('app')
)
