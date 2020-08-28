/**
 * @Date:   2020-01-21T13:48:48+00:00
 * @Last modified time: 2020-01-27T15:47:36+00:00
 */



import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Card, Row, Col, Button } from 'react-bootstrap';
import "../App.css";

export default class CreateExercise extends Component {
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
    axios.get('http://localhost:5000/names/')
      .then(response => {
        console.log(response);
        if (response.data.length > 0) {
          this.setState({
            names: response.data.map(name => name.title),
            title: response.data[0].title
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
    this.setState ({
        image: e.target.value
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  handleFileUpload = (event) => {
    console.log(event);
    const data = new FormData();
    data.append('file', event.target.files[0]);
    data.append('name', 'some value user types');
    data.append('description', 'some value user types');
    // '/files' is your node.js route that triggers our middleware
    axios.post('/files', data).then((response) => {
      console.log(response); // do something with the response
      //if response message is fail replace with generic image
      const message = response.data.message;
      if (message==="Fail") {
        this.setState ({
            image: "blank.jpg"
        });
      } else {
        this.setState ({
            image: response.data.message
        });
      }

    });
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

    axios.post('/exercises/add/', exercise)
      .then(res => console.log(res.data));

    window.location = '/exercises';
  }

  render() {
    return (
    <div class="container">
      <Row style={{ marginTop: "1.5rem" }}>
      <Card className="create-card">
      <Row>
      <Col>
      <h3>Create Exercise Log</h3>
      </Col>
      </Row>
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label>title: </label>
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
          <Row>
          <Col>
          <label>Date: </label>
          </Col>
          </Row>
          <Row>
          <Col>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
        </Col>
        </Row>
        </div>

        <div className="form-group">
        <label>Image (optional): </label>
        <div className="custom-file">
        <input type="file" onChange={this.handleFileUpload} id="inputGroupFile01" class="image-text"/>
        </div>
        </div>

        <div className="form-group">
        <Button variant="outline-primary" type="submit" value="Create Name" className="form-button">Create Log</Button>
        </div>
      </form>
     </Card>
    </Row>
    </div>
    )
  }
}
