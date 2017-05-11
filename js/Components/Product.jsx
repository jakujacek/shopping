import React from 'react'
import config from '../config.js'
import ProductImage from './Libraries/ProductImage.jsx'
import ProductImages from './Libraries/ProductImages.jsx'
import ProductInfo from './Libraries/ProductInfo.jsx'

class Product extends React.Component {
   constructor(props){
       super(props)
       this.state = {
           product: {},
           id: this.props.params.id,
           products: {},
           success: false
       }
   }
   handleQuantityChange = event => {
     this.setState({
       products: {quantity: event.target.value}
     })
   }
   handlaAddToCartButtonClick = () => {
     let product = this.state.products
     product.id = this.state.product.id


      fetch(config.apiUrl + '/addToCart', {
        method: "POST",
        body: JSON.stringify({
          cartId: localStorage.getItem('cart'),
          products: product
        })
      })
      .then(() => {
        this.setState({
          products: {},
          success: true
        }, ()=> {
          let st = setTimeout(()=> {
            this.setState({
              success: false
            })
            clearTimeout(st)
          }, 3000)
        })
      })
   }

   componentWillMount(){
       fetch(config.apiUrl + "/product/" + this.state.id)
           .then(response => response.json())
           .then(responseJson => {
               console.log(responseJson);
               this.setState({
                   product: responseJson.product
               })
           })
   }

   componentDidMount(){
       this.hasData = false
       if (this.state.product !== {}) {
           this.hasData = true
       }
   }

   render(){
       return (
         <div className="row">
             <div className="col-md-12 col-lg-12 col-sm-12">
                 <div className="col-md-6 col-sm-12">
                     {
                         this.hasData ? <ProductImage url={this.state.product.product_images[0].url} /> : null
                     }
                     {
                         this.hasData ? <ProductImages images={this.state.product.product_images} /> : null
                     }
                 </div>
                 <div className="col-md-6 col-sm-12">
                    {
                      this.state.productInCart
                    }
                   {
                     this.hasData ? <ProductInfo
                                     name={this.state.product.name}
                                     price={this.state.product.price}
                                     quantity={this.state.product.quantity}
                                     description={this.state.product.description}
                                     available={this.state.product.available}
                                     btnHandleClick={this.handlaAddToCartButtonClick}
                                     qntHandleChange={this.handleQuantityChange}
                                     /> : null
                   }
                   {
                     this.state.success ? <span className="alert alert-success">
                     This product succesfully added to your cart
                     </span> : null
                   }
                 </div>
             </div>
         </div>

       )
   }
}

export default Product
