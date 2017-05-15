import React from 'react'
import AdditionalCartForm from './Libraries/AdditionalCartForm.jsx'
import {hashHistory} from 'react-router'
import config from '../config.js'
class CartForm extends React.Component {
  constructor(props) {
  super(props)
  this.state = {
    name: "",
    surname: "",
    street: "",
    local: "",
    postcode: "",
    city: "",
    payment: "",
    paymentMethods: [
      "card",
      "transfer"
    ],
    invoice: false,
    nip: "",
    companyName: "",
    extraInfo: "",
    sent: false,
    timeToRedirect: 5
   }
}
  handleNameChange = event => {
    this.setState({
      name: event.target.value
    })
  }

  handleSurNameChange = event => {
    this.setState({
      surname: event.target.value
    })
  }

  handleStreetChange = event => {
    this.setState({
      street: event.target.value
    })
  }

  handleLocalChange = event => {
    this.setState({
      local: event.target.value
    })
  }

  handlePostCodeChange = event => {
    this.setState({
      postcode: event.target.value
    })
  }

  handleCityChange = event => {
    this.setState({
      city: event.target.value
    })
  }

  handlePaymentChange = event => {
    this.setState({
      name: event.target.value
    })
  }

  handleInvoiceChange = event => {
    this.setState({
      invoice: event.target.checked
    })
  }

  handleNipChange = event => {
    this.setState({
      nip: event.target.value
    })
  }

  handleCompanyNameChange = event => {
    this.setState({
      companyName: event.target.value
    })
  }

  handleExtraInfoChange = event => {
    this.setState({
      extraInfo: event.target.value
    })
  }

  handleFormSubmit = event => {
    event.preventDefault()
    fetch(config.apiUrl + "/createOrderFromCart", {
      method: "POST",
      body: JSON.stringify({
        cartId: this.props.params.id
      })

    })
    .then(response => response.json())
    .then(responseJson => {
      localStorage.removeItem('cart')
      this.setState({
        sent: true
      })
      let inter = setInterval(() => {
        this.setState({
          timeToRedirect: this.state.timeToRedirect -1
        }, () => {
          if(this.state.timeToRedirect === 0) {
            clearInterval(inter)
            hashHistory.push("/")
          }
        })
      }, 1000)
    })
  }
  render() {
    if (this.state.sent) {
      return <div className="row">
              <h1>Thank you for your order</h1>
              <p>You will be redirect in... {this.state.timeToRedirect}</p>
              </div>
    }
    return <div className="row">
                <div className="col-md-12 col-sm-12 form-group">
                      <div className="col-md-12 form-group text-center" >
                          <h2>Insert data for shipment</h2>
                      </div>
                      <form onSubmit={this.handleFormSubmit}>
                            <div className="col-md-6">
                                <div className="col-md-12 form-group" >
                                    <input type="text"
                                    placeholder="name"
                                    className="form-control"
                                    onChange={this.handleNameChange}/>
                                </div>
                                <div className="col-md-12 form-group" >
                                    <input type="text" placeholder="street" className="form-control"
                                    onChange={this.handleStreetChange}/>
                                </div>
                                <div className="col-md-12 form-group" >
                                    <input type="text" placeholder="postcode" className="form-control"
                                    onChange={this.handlePostCodeChange}/>
                                </div>
                                <div className="col-md-12 form-group" >
                                    <select className="form-control"
                                    onChange={this.handlePaymentChange}>
                                    {
                                          this.state.paymentMethods.map(( element, index) => {
                                            return <option  key={index}>
                                                      {element}
                                                  </option>
                                          })
                                    }
                                    </select>
                                </div>
                                {

                                  this.state.invoice ? <AdditionalCartForm
                                  handleNipChange={this.handleNipChange}
                                  handleCompanyNameChange={this.handleCompanyNameChange}/> : null
                                }
                            </div>
                      <div className="col-md-6">
                          <div className="col-md-12 form-group">
                                <input type="text" placeholder="surname" className="form-control"
                                onChange={this.handleSurNameChange}/>
                          </div>
                          <div className="col-md-12 form-group" >
                                <input type="text" placeholder="number/local" className="form-control"
                                onChange={this.handleLocalChange}/>
                          </div>
                          <div className="col-md-12 form-group" >
                                <input type="text" placeholder="city" className="form-control"
                                onChange={this.handleCityChange}/>
                          </div>
                          <div className="col-md-12 form-group" >
                                <input type="checkbox"
                                onChange={this.handleInvoiceChange}/> Invoice
                          </div>
                          <div className="col-md-12 form-group" >
                                <textarea placeholder="info" className="form-control textarea"
                                onChange={this.handleExtraInfoChange}></textarea>
                          </div>
                          <div className="col-md-12 form-group" >
                                <button type="submit" className="btn btn-warning pull-right">
                                  Confirm
                                </button>
                          </div>

                      </div>
                </form>
                </div>
          </div>
  }
}
export default CartForm
