/**
 * @Date:   2020-01-27T15:17:07+00:00
 * @Last modified time: 2020-01-27T15:49:49+00:00
 */



import '../App.css';
import { Card, Row, Col } from 'react-bootstrap';
import React, {Component} from 'react'

class About extends React.Component {

  render() {
  return(
    <div className="App">
    <div className="App">
          <div>
            <div>
            <Row>
            <Col style={{ width: '65rem', marginLeft: '5rem', marginRight: '5rem' }}>
            <h1 class="about-heading">About Trackmaster</h1>
              <p className="about-text">Trackmaster is an online platform for logging excercises and creating a
                personalized fitness plan. <br/><br/>
              It allows anyone to organise exercise plans
              through the Trackmaster interface with ease. By simply registering one can create their plan based on
              how they want to get in shape. This is done by simply clicking on the <b> 'New Type' </b> tab where you
              can make a new type of excercise to log whether it be cardio or strength based etc. Then by going to the
              <b> 'Create Excercise Log' </b> page one can add details for the new log that they wish to create. images
                can also be added and seen in the gallery in 'images'
               <br/><br/> Users can also view the list of logged excercises they have made on the
               apps homepage by clicking <b> 'TrackMaster' </b>. From here you can also edit & delete any excercise log created.
               <br/></p>
               </Col>
               </Row>
               <Row>
               <Col style={{ width: '5rem', marginLeft: '5rem', marginRight: '5rem' }}>
               <div className="aboutimg"> </div>
               </Col>
               <Col style={{ width: '65rem', marginLeft: '5rem', marginRight: '5rem' }}>
               <div className="aboutimg2"> </div>
               </Col>
              </Row>
              </div>
            </div>
    </div>
    </div>
  );
  }
}

export default About;
