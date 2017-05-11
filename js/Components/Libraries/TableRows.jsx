import React from 'react'
import { Link } from 'react-router'

class TableRows extends React.Component {
  render() {
    return (
      <tr>
        <td >
          <img className="mini-photo" src={this.props.photo} alt='foto' />
        </td>
        <td>
          <span className='name'>
             {this.props.name}
          </span>
          <span className='price'>
             ({this.props.price} zł)
          </span>
          <span className='available'>
             {this.props.available ? <span className='available'>Dostępny</span> :
                                     <span className='unavailable'>Niedostępny</span>
             }
          </span>
          <span className='amount'>
             {this.props.amount}
          </span>
          <p className='description'>
             {this.props.description.substr(0,30) + '...'}
          </p>
          <Link to={'/product/' + this.props.id} className="btn btn-info show-product-button">
            Show
          </Link>
        </td>
      </tr>
    )
  }
}

export default TableRows
