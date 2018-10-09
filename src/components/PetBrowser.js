import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {
  render() {
    const petCards = this.props.pets.map( pet => {
      // Every Pet component should have onAdoptPet that is handled by App 
      return <Pet pet={pet} key={pet.id} onAdoptPet={this.props.onAdoptPet} />
    })
    return <div className="ui cards">{petCards}</div>
  }
}

export default PetBrowser
