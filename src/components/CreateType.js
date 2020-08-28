/**
 * @Date:   2020-01-21T13:59:50+00:00
 * @Last modified time: 2020-01-27T15:15:54+00:00
 */



import React, { Component } from 'react';
import axios from 'axios';
import { Card, Row, Col, Button } from 'react-bootstrap';

export default class CreateType extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: ''
    }
  }

  onChangeName(e) {
    this.setState({
      title: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const name = {
      title: this.state.title
    }

    console.log(name);

    axios.post('http://localhost:5000/names/add', name)
      .then(res => console.log(res.data));

    this.setState({
      title: ''
    })
  }

  render() {
    return (
      <div>
        <Row style={{ marginTop: "3rem" }}>
        <Card className="create-excercise-card">
        <Row>
        <Col>
        <h3>Create Excercise</h3>
        </Col>
        </Row>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>title: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.title}
                onChange={this.onChangeName}
                />
          </div>
          <div className="form-group">
             <Button variant="outline-primary" type="submit" value="Create Name" className="form-button">Create Name</Button>
          </div>
        </form>
      </Card>
     </Row>
     </div>
    )
  }
}
