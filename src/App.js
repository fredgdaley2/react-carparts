import React from 'react';

import Firebase from 'firebase/app';
import 'firebase/database';
import DB_CONFIG from './config'
import DefaultPart from './DefaultPart';
import CarPartGrid from './CarPartGrid/CarPartGrid';
import CarPartForm from './CarPartForm/CarPartForm';

class App extends React.Component {

  constructor(props) {
    super(props);

    Firebase.initializeApp(DB_CONFIG);
    this.database = Firebase.database().ref().child('carparts');

    this.state = {
      carParts: [],
      newPart: {
        partNbr: "",
        partName: "",
        description: "",
        manufactureName: "",
      },
      isEditMode: false,
      isAddingNewPart: false,
    };

  }


  componentDidMount() {
    this.getCarPartData();
    const previousCarParts = this.state.carParts;

    this.database.on('child_added', snapShot => {
      previousCarParts.push({
        id: snapShot.key,
        partNbr: snapShot.val().partNbr,
        partName: snapShot.val().partName,
        description: snapShot.val().description,
        manufactureName: snapShot.val().manufactureName,
      });

      this.setState({
        carParts: previousCarParts
      });

    });

    this.database.on('child_removed', snapShot => {
      for (var i = 0; i < previousCarParts.length; i++) {
        if (previousCarParts[i].id === snapShot.key) {
          previousCarParts.splice(i, 1);
        }
      }

      this.setState({
        carParts: previousCarParts
      });
    });

    this.database.on('child_changed', snapShot => {
      for (var i = 0; i < previousCarParts.length; i++) {
        if (previousCarParts[i].id === snapShot.key) {
          previousCarParts[i] = snapShot.val();
        }
      }

      this.setState({
        carParts: previousCarParts
      });
    });
  };

  getCarPartData = () => {
    this.database.on('value', snapshot => {
      const state = snapshot.val();
      this.setState(state);
    });
  };

  addCarPart(part) {
    this.database.push().set({
      partNbr: part.partNbr,
      partName: part.partName,
      description: part.description,
      manufactureName: part.manufactureName,
    });
    this.toggleAddingNewPart();
  };

  removeCarPart = (partId) => {
    this.database.child(partId).remove();
  };

  updateCarPart = () => {
    this.database.child(this.state.newPart.id).update(this.state.newPart);
    this.setState({ isEditMode: false, isAddingNewPart: false });
  }

  getPartToEdit = (partId) => {
    let partToEdit = this.state.carParts.find((part) => part.id === partId);
    this.setState({ newPart: partToEdit, isEditMode: true, isAddingNewPart: false });
  }

  seedDb() {
    const newPart = this.getNewCartPart();
    newPart.partName = "Gas Tank";
    newPart.description = "Filler Up!";
    newPart.manufactureName = "Dodge";
    this.addCarPart(newPart);
  }

  getNewCartPart() {
    const defPart = new DefaultPart();
    const newPart = defPart.getNewPart();
    this.setState({ newPart: newPart })
  }

  newPartOnChangeHandler = (event) => {
    let newPart = { ...this.state.newPart };
    newPart[event.target.id] = event.target.value;
    this.setState({ newPart: newPart });
  }

  saveNewPartHandler = () => {
    this.addCarPart(this.state.newPart);
  }

  cancelAddEdit = () => {
    this.setState({ isEditMode: false, isAddingNewPart: false });
  }
  
  toggleAddingNewPart = () => {
    this.setState(prevState => ({ isAddingNewPart: !prevState.isAddingNewPart }), () => {
      if (this.state.isAddingNewPart) {
        this.getNewCartPart();
      }
    });
  };

  showAddButtonOrCarPartForm = () => {
    if (!this.state.isAddingNewPart && !this.state.isEditMode) {
      return <button type="button" className="btn btn-primary btn-sm mt-3 mb-3" onClick={this.toggleAddingNewPart}>Add New Part</button>
    }
    return <CarPartForm
      part={this.state.newPart}
      isEditMode={this.state.isEditMode}
      isAddingNewPart={this.state.isAddingNewPart}
      onChange={this.newPartOnChangeHandler}
      onSave={this.state.isAddingNewPart ? this.saveNewPartHandler : this.updateCarPart} 
      onCancel={this.cancelAddEdit}/>
  }

  showCarPartGrid = () => {
    if (!this.state.isAddingNewPart && !this.state.isEditMode) {
      return <CarPartGrid parts={this.state.carParts} onDelete={this.removeCarPart} onEdit={this.getPartToEdit} />;
    }
    return null;
  }
  render() {
    return (
      <div className="container-fluid">
        {this.showAddButtonOrCarPartForm()}
        {this.showCarPartGrid()}
      </div>
    )
  }
}

export default App;
