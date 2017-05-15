import React from 'react'

class AdditionalCartForm extends React.Component {
  render() {
    return <div className="row">
          <div className="col-md-12 form-group">
              <input
              type="text"
              placeholder="nip"
              className="form-control"
              onChange={this.props.handleNipChange} />
          </div>
          <div className="col-md-12 form-group">
              <input
              type="text"
              placeholder="company name"
              className="form-control"
              onChange={this.props.handleCompanyNameChange} />
          </div>

    </div>
  }
}
export default AdditionalCartForm
