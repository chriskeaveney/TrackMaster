/**
 * @Date:   2020-01-27T10:03:02+00:00
 * @Last modified time: 2020-01-27T15:51:28+00:00
 */



import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Card, Row, Col, Button } from 'react-bootstrap';

export default class EditExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: '',
      description: '',
      duration: 0,
      image: '',
      date: new Date(),
      names: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/exercises/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          title: response.data.title,
          description: response.data.description,
          duration: response.data.duration,
          image: response.data.image,
          date: new Date(response.data.date)
        })
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:5000/names/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            names: response.data.map(name => name.title),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    })
  }

  onChangeImage(e) {
    this.setState({
      image: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      title: this.state.title,
      description: this.state.description,
      duration: this.state.duration,
      image: this.state.image,
      date: this.state.date
    }

    console.log(exercise);

    axios.post('http://localhost:5000/exercises/update/' + this.props.match.params.id, exercise)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div class="container">
      <Row style={{ marginTop: "1.5rem" }}>
      <Card className="create-card">
      <Row>
      <Col>
      <h3>Edit Exercise Log</h3>
      </Col>
      </Row>
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label>Name: </label>
          <select ref="nameInput"
              required
              className="form-control"
              value={this.state.title}
              onChange={this.onChangeTitle}>
              {
                this.state.names.map(function(name) {
                  return <option
                    key={name}
                    value={name}>{name}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
              type="text"
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
        <label>Image (optional): </label>
        <div className="custom-file">
        <input type="file" onChange={this.handleFileUpload} id="inputGroupFile01" class="image-text"/>
        </div>
        </div>

        <div className="form-group">
        <Button variant="outline-primary" type="submit" value="Edit Excercise Log" className="form-button">Edit Log</Button>
        </div>
        </form>
        </Card>
      </Row>
    </div>
    )
  }
}
