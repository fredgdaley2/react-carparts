import React from 'react'


const CarPartGrid = (props) => {
    const partRows = props.parts.map((item, idx) => {
        return <tr key={idx}>
            <th scope="row">{item.partNbr}</th>
            <td>{item.partName}</td>
            <td>{item.description}</td>
            <td>{item.manufactureName}</td>
            <td>
            <button type="button" className="btn btn-secondary btn-sm mr-2" onClick={() => props.onEdit(item.id)}>Edit</button>
            <button type="button" className="btn btn-danger btn-sm" onClick={() => props.onDelete(item.id)}>Delete</button>
            </td>
        </tr>
    });

    if (partRows.length === 0) {
        return (<div className="text-center"><p><strong>No Data To Display, Add A Part</strong></p></div>)
    }

    return (
        <div>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Part#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Manufacturer</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {partRows}
                </tbody>
            </table>
        </div>
    );
};

export default CarPartGrid;