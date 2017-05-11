import React from 'react'
import ProductImage from './ProductImage.jsx'

class ProductImages extends React.Component {
  render() {
    return (
      <ul className="product-images">
        {
          this.props.images.map(element => {
            return (
              <li key={element.id}>
                <ProductImage url={element.url} />
              </li>
            )
          })
        }
      </ul>
    )
  }
}

export default ProductImages
