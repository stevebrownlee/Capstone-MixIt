import React, { Component } from "react"
import Drink from "./Drink"
import Database from "../APIManager"
import { FormControl, FormGroup } from "react-bootstrap";

export default class DrinkList extends Component {
    state = {
        drinks: [],
        drinkToEdit: {}
    }
// Here, my DOM is being set up with the data from 'state'. 
// I'm essentially setting state.
componentDidMount() {
    Database.getAllDrinks()
    .then(drinks => {
        this.setState({ drinks: drinks })
    })
}
// This function enables me to input new drink details and 
// then prepare to change state with the new drink.
drinkFormInput = (drink) => {
    const stateToChange = {}
    stateToChange[drink.target.id] = drink.target.value
    this.setState(stateToChange)
}
// This code gets the username data so React will have a way
// to know which user each drink belongs to.
getUserNameByUserId = (userId) => {
    Database.getUserNameByUserId(userId)
    .then(userName => this.setState({ drink: userName}))
}
// Now I need code to add a drink to the database
addDrink = (drink) => {
    drink.preventDefault()
    const newObject = {
        DrinkName: this.state.DrinkName,
        DrinkLiquor: this.state.DrinkLiquor,
        DrinkMixer: this.state.DrinkMixer,
        DrinkInstructions: this.state.DrinkInstructions,
        userId: Database.getIdOfCurrentUser()
    }
    Database.addDrink(newObject)
    .then(DrinkList => {
        this.setState({ drinks: DrinkList})
    })
    console.log("newObject", newObject)

}
deleteDrink = (drinkId) => {
    Database.deleteDrink(drinkId)
    // console.log("drinkId", drinkId)
        .then(deletedDrink => this.setState({ drinks: deletedDrink }))
}

handleEdit = (drink) => {
    drink.preventDefault()
    fetch(`http://localhost:5002/drinks/${this.state.drinkToEdit.id}`, {
        method: "PUT",
        body: JSON.stringify(this.state.drinkToEdit),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(() => { return fetch("http://localhost:5002/drinks") })
        .then(a => a.json())
        .then(DrinkList => {
            this.setState({
                drinks: DrinkList
            })

        })
}

EditDrink = (drinkId) => {
    console.log("drinkId", drinkId)
    fetch(`http://localhost:5002/drinks/${drinkId}`)
    .then(a => a.json())
    .then(DrinkList => {
        drinkToEdit: DrinkList
    })
    
}

// I need to build the form for the user to add a new drink
    render() {
        return (
            <div className="drink">
                <form onSubmit={this.addDrink.bind(this)}>
                    <h1 id="drink-name" className="h3 mb-3 font-weight-normal">My Drinks</h1>
                    <label htmlFor="DrinkName">
                        Drink Name:
            </label>
                    <FormGroup>
                        <FormControl onChange={this.drinkFormInput} type="text"
                            id="DrinkName"
                            placeholder="Enter Drink Name"
                            required="" autoFocus="" />
                    </FormGroup>
                    <label htmlFor="DrinkLiquor">
                        Drink Liquors:
            </label>
                    <FormGroup>
                        <FormControl onChange={this.drinkFormInput} type="text"
                            id="DrinkLiquor"
                            placeholder="Enter Drink Liquors"
                            required="" />
                    </FormGroup>
                    <label htmlFor="DrinkMixer">
                        Drink Mixers:
                    </label>
                    <FormGroup>
                        <FormControl onChange={this.drinkFormInput} type="text"
                            id="DrinkMixer"
                            placeholder="Enter Drink Mixers"
                            required="" />
                    </FormGroup>
                    <label htmlFor="DrinkInstructions">
                        Drink Instructions:
                    </label>
                    <FormGroup>
                        <FormControl onChange={this.drinkFormInput} type="text"
                            id="DrinkInstructions"
                            placeholder="Enter Drink Instructions"
                            required="" />
                    </FormGroup>
                    <button type="submit">
                        Add Drink
                        </button>
                </form>
                {
                    this.state.drinks.map(drink =>
                        <Drink key={drink.id} drink={drink}
                            EditDrink={this.EditDrink} drink={drink} 
                            deleteDrink={this.deleteDrink} drink={drink}
/>
                    )
                }

                <form onSubmit={this.handleEdit.bind(this)}>

                    <input onChange={this.handleFieldChange} type="text"
                        id="DrinkName"
                        placeholder="Edit Drink Name"
                        value={this.state.drinkToEdit.DrinkName}
                        required="" autoFocus="" />

                    <input onChange={this.handleFieldChange} type="text"
                        id="DrinkLiquor"
                        placeholder="Edit Drink Liquors"
                        value={this.state.drinkToEdit.DrinkLiquor}
                        required="" autoFocus="" />

                    <input onChange={this.handleFieldChange} type="text"
                        id="DrinkMixer"
                        placeholder="Edit Drink Mixers"
                        value={this.state.drinkToEdit.DrinkMixer}
                        required="" autoFocus="" />

                    <input onChange={this.handleFieldChange} type="text"
                        id="DrinkIngredients"
                        placeholder="Edit Drink Instructions"
                        value={this.state.drinkToEdit.DrinkInstructions}
                        required="" autoFocus="" />

                    <button type="submit">
                        Update Drink
                       </button>
                </form>





            </div>

        )
    }
}
                
                
                
                
                
