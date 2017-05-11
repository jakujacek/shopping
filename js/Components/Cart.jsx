import React from 'react'
import config from '../config.js'
import CartTableRows from './Libraries/CartTableRows.jsx'
class Cart extends React.Component {
  constructor() {
    super()
    this.state = {
      products: []
    }
  }
  componentWillMount() {
    fetch(config.apiUrl + '/getCart/' + localStorage.getItem('cart'))
    .then( response => response.json())
    .then(responseJson => {console.log(responseJson.items);
      this.setState({
        products: responseJson.items
      })
    })
  }

  componentDidMount() {
    this.hasData = false
    if(this.state.products !== []) {
      this.hasData = true
    }
  }

  countAllElements = () => {
    let sum = 0
    this.state.products.forEach( element => {
      sum += parseInt(element.price)
    })
    return sum;
  }
  handleDeleteClick = event => {
    if (confirm("Do you really want to delete this item")) {
      fetch(config.apiUrl + "/cart/delete/" + event.target.dataset.id)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          products: responseJson.items
        })
      })
    }
  }
  render() {
    return <div className="row">
      <div className="col-md-12 col-sm-12">
        <table className="table table-bordered table-hovered">
          <tbody>
            { this.hasData ?
              this.state.products.map(element => {
                return <CartTableRows
                                  key={element.id}
                                  id={element.id}
                                  name={element.product.name}
                                  price={element.product.price}
                                  quantity={element.quantity}
                                  photo={element.product.product_images[0].url}
                                  productSum={element.quantity * element.product.price}
                                  deleteButton={this.handleDeleteClick}/>
              }) : null
            }
          </tbody>
        </table>
          <div className="totalSum">
              Total: {this.countAllElements()}
          </div>
      </div>
    </div>
  }
}
export default Cart
