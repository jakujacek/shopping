import React from 'react'
import config from '../config.js'
class Order extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      order: {}
    }
  }

  componentDidMount() {
    fetch(config.apiUrl + "/order/" + this.props.params.id)
    .then(response => response.json())
    .then(responseJson => {
      console.log(responseJson);
    })
  }
  render() {
    return <div className="row">
              <div className="col-md-12 col-sm-12">

              </div>
          </div>
  }
}

export default Order
