import React from 'react'
import config from '../config'
import TableRows from './Libraries/TableRows.jsx'

class Products extends React.Component {
  constructor() {
    super()
    this.state = {
      products: []
    }
  }

  componentDidMount() {
    fetch(config.apiUrl + '/products')
      .then(response => response.json()
        .then(responseJson => {
          this.setState({
            products: responseJson.products
          })
        })
        .catch(err => {
          throw new Error(err)
        })
      )
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12 col-sm-12">
          <table className="table table-bordered table-hovered">
            <tbody>
              {
                this.state.products.map(element => {
                  return <TableRows
                                    key={element.id}
                                    id={element.id}
                                    name={element.name}
                                    price={element.price}
                                    available={element.available}
                                    photo={element.product_images[0].url}
                                    description={element.description} />
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default Products
