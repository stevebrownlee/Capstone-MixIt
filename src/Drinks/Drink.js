import { Card, Button, CardTitle, CardText, CardColumns, ButtonGroup, ButtonToolbar, Col, Row, Container } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import Database from "../APIManager";
import { SketchPicker } from "react-color";


export default class Drink extends Component {
  state = {
      showForm: false
  };
  

  handleEdit = drink => {
    // drink.preventDefault();
    // fetch(`http://localhost:5002/drinks/${this.state.drinkToEdit.id}`, {
    //   method: "PUT",
    //   body: JSON.stringify(this.state.drinkToEdit),
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // })
    //   .then(() => {
    //     return fetch("http://localhost:5002/drinks");
    //   })
    //   .then(a => a.json())
    this.props.handleEditADrink(this.state.drinkToEdit.id, this.state.drinkToEdit)
      .then(DrinkList => {
        this.setState({
          showForm: false
        });
      });
  };

  EditDrink = drinkId => {
    console.log("drinkId", drinkId);
    fetch(`http://localhost:5002/drinks/${drinkId}`)
      .then(a => a.json())
      .then(oneDrink => {
        this.setState({
          drinkToEdit: oneDrink,
          showForm: true
        });
      });
      
  };

  handleFieldChange = (event) => {
    const stateToChange = this.state.drinkToEdit
    stateToChange[event.target.id] = event.target.value
    this.setState({ drinkToEdit: stateToChange })
}
  render() {
    return (
      <div>
         
        

        {this.state.showForm ? (

        <form onSubmit={this.handleEdit}>
          <input
            onChange={this.handleFieldChange}
            type="text"
            id="DrinkName"
            placeholder="Edit Name"
            value={this.state.drinkToEdit.DrinkName}
            required=""
            autoFocus=""
          />

          <input
            onChange={this.handleFieldChange}
            type="text"
            id="DrinkLiquor"
            placeholder="Edit Liquor"
            value={this.state.drinkToEdit.DrinkLiquor}
            required=""
            autoFocus=""
          />

          <input
            onChange={this.handleFieldChange}
            type="text"
            id="DrinkMixer"
            placeholder="Edit Mixers"
            value={this.state.drinkToEdit.DrinkMixer}
            required=""
            autoFocus=""
          />

          <input
            onChange={this.handleFieldChange}
            type="text"
            id="DrinkInstructions"
            placeholder="Edit Instructions"
            value={this.state.drinkToEdit.DrinkInstructions}
            required=""
            autoFocus=""
          />

          <Button type="submit">Update Drink</Button>
        </form>) : (
          // <div className="container">
          <div className="p-3" >
          {/* <CardColumns> */}
          <Container>
          <Col xs="8">
        <Card body inverse style={{ backgroundColor: '#BA8005', borderColor: 'warning' }}>
        <CardTitle>{this.props.drink.DrinkName}</CardTitle>
        <CardText>{this.props.drink.DrinkLiquor}</CardText>
        <CardText>{this.props.drink.DrinkMixer}</CardText>
        <CardText>{this.props.drink.DrinkInstructions}</CardText>
        {/* <a href="#" onClick={() => this.props.EditDrink(this.props.drink.id)}>Edit Drink</a> */}
        {/* <a href="#" onClick={() => this.props.deleteDrink(this.props.drink.id)}>Delete Drink</a> */}
        <ButtonGroup>
        <div className="p-1">

        <Button color="secondary" margin-left onClick={() => this.EditDrink(this.props.drink.id)}>
          Edit Drink
        </Button>
        </div>
        <div className="p-1">

        <Button color="secondary" margin-left onClick={() => this.props.deleteDrink(this.props.drink.id)}>
          Delete Drink
        </Button>
        </div>
        </ButtonGroup>
      </Card>
      </Col>
      </Container>
      {/* </CardColumns> */}

      </div>
      // </div>
    )
          }
      </div>
    );
  }
}
