import React from 'react'

const CarPartForm = (props) => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-6 offset-md-3">
                    <form className="mb-3">
                        <fieldset>
                            <legend>Car Part - {props.isEditMode ? "Edit" : "New"}</legend>
                            <p className="form-group">
                                <label htmlFor="partNbr">Part #</label>
                                <input className="form-control" type="text" id="partNbr" readOnly value={props.part.partNbr} />
                            </p>
                            <p className="form-group">
                                <label htmlFor="partName">Name</label>
                                <input className="form-control" type="text" id="partName" value={props.part.partName} onChange={props.onChange} placeholder="Part Name" />
                            </p>
                            <p className="form-group">
                                <label htmlFor="description">Description</label>
                                <input className="form-control" type="text" id="description" value={props.part.description} onChange={props.onChange} placeholder="Description" />
                            </p>
                            <p className="form-group">
                                <label htmlFor="manufacturer">Manufacturer</label>
                                <select className="form-control" id="manufactureName" value={props.part.manufactureName} onChange={props.onChange}>
                                    <option value="">Choose...</option>
                                    <option value="Acura">Acura</option>
                                    <option value="Alfa Romeo">Alfa Romeo</option>
                                    <option value="Audi">Audi</option>
                                    <option value="BMW">BMW</option>
                                    <option value="Bentley">Bentley</option>
                                    <option value="Buick">Buick</option>
                                    <option value="Cadillac">Cadillac</option>
                                    <option value="Chevrolet">Chevrolet</option>
                                    <option value="Chrysler">Chrysler</option>
                                    <option value="Dodge">Dodge</option>
                                    <option value="Fiat">Fiat</option>
                                    <option value="Ford">Ford</option>
                                    <option value="GMC">GMC</option>
                                    <option value="Genesis">Genesis</option>
                                    <option value="Honda">Honda</option>
                                    <option value="Hyundai">Hyundai</option>
                                    <option value="Infiniti">Infiniti</option>
                                    <option value="Jaguar">Jaguar</option>
                                    <option value="Jeep">Jeep</option>
                                    <option value="Kia">Kia</option>
                                    <option value="Land Rover">Land Rover</option>
                                    <option value="Lexus">Lexus</option>
                                    <option value="Lincoln">Lincoln</option>
                                    <option value="Lotus">Lotus</option>
                                    <option value="Maserati">Maserati</option>
                                    <option value="Mazda">Mazda</option>
                                    <option value="Mercedes-Benz">Mercedes-Benz</option>
                                    <option value="Mercury">Mercury</option>
                                    <option value="Mini">Mini</option>
                                    <option value="Mitsubishi">Mitsubishi</option>
                                    <option value="Nissan">Nissan</option>
                                    <option value="Polestar">Polestar</option>
                                    <option value="Pontiac">Pontiac</option>
                                    <option value="Porsche">Porsche</option>
                                    <option value="Ram">Ram</option>
                                    <option value="Rolls-Royce">Rolls-Royce</option>
                                    <option value="Saab">Saab</option>
                                    <option value="Saturn">Saturn</option>
                                    <option value="Scion">Scion</option>
                                    <option value="Smart">Smart</option>
                                    <option value="Subaru">Subaru</option>
                                    <option value="Suzuki">Suzuki</option>
                                    <option value="Tesla">Tesla</option>
                                    <option value="Toyota">Toyota</option>
                                    <option value="Volkswagen">Volkswagen</option>
                                    <option value="Volvo">Volvo</option>
                                </select>
                            </p>
                            <button type="button" className="btn btn-primary btn-lg btn-block" onClick={props.onSave}>Save</button>
                            <button type="button" className="btn btn-secondary btn-lg btn-block" onClick={props.onCancel}>Back</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CarPartForm;