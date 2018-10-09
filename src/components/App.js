import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  // destructuring the event
  // this is equivalent to event.target.value
  onChangeType = ({ target: { value } }) => {
    this.setState({ filters: { ...this.state.filters, type: value } });
  };

  fetchPets = () => {
    let endpoint = '/api/pets'

    if(this.state.filters.type !== 'all'){
      endpoint += `?type=${this.state.filters.type}`
    }

    fetch(endpoint)
    .then(res => res.json())
    .then( pets => {
      // since the key and value have the same name, we can just use 1 name
      this.setState({ pets })
    })
  }

  onAdoptPet = petId => {
    // iterate over the state pets, and if the ID of current pet
    // is equal to the petId that we passed in, update the pet
    const pets = this.state.pets.map(p => {
      return p.id === petId ? { ...p, isAdopted: true } : p;
    });
    this.setState({ pets });
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              {/* Pass Filters 2 props, onChangeType and onFindPetsClick */}
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.fetchPets} />
            </div>
            <div className="twelve wide column">
              { /* Pass PetBrowser two props, the state pets and onAdoptPet */ }
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
