import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import "../App.css";

const Exercise = props => (
  <tr>
    <td>{props.exercise.title}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
    <td>
      <Link class="editButton" to={"/edit/"+props.exercise._id}>edit</Link> | <a class="deleteButton" href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
    </td>
  </tr>
)

export default class ExerciseList extends Component {
  Post = e => {
      e.preventDefault();
      const file = document.getElementById("inputGroupFile01").files;
      const formData = new FormData();

      formData.append("img", file[0]);

      fetch("http://localhost:5000/", {
        method: "POST",
        body: formData
      }).then(r => {
        console.log(r);
      });

      document
        .getElementById("img")
        .setAttribute("src", `http://localhost:5000/${file[0].name}`);
        console.log(file[0]);
  };

  constructor(props) {
    super(props);
    this.deleteExercise = this.deleteExercise.bind(this)
    this.state = {
                  exercises: [],
                  search: ""
                };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/exercises/')
      .then(response => {
        this.setState({ exercises: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteExercise(id) {
    axios.delete('http://localhost:5000/exercises/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)
    })
  }

  exerciseList() {
    var search= this.state.search;
    var filteredExercises = this.state.exercises;
    if (search !== "") {
      filteredExercises = this.state.exercises.filter(exercises => {
        //does the title contain the search term
        return exercises.title.toLowerCase().indexOf(search) !== -1;
      });
    }
    return filteredExercises.reverse().map(currentexercise => {
      return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
    })
  }

  onchange = e => {
    this.setState({ search: e.target.value });
    console.log(this.state.search);
  };

  render() {
    let exerciseList =[];
    if (this.state.exercises[0]!==undefined) {
      exerciseList = this.exerciseList();
    }

    const { search } = this.state.search;

    return (
      <div>
        <Row className="search-row">
        <Col className="keyword-col">
          <p style={{display: 'inline'}}><b>Logged Exercises</b></p>
          <input style={{display: 'inline'}} className="form-control" type = "text" placeholder = "Search for an exercise title..." onChange={this.onchange}/>
        </Col>
        </Row>
        <br/>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>title</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.exerciseList() }
          </tbody>
        </table>
      </div>
    )
  }
}
