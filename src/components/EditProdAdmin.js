import React from "react";
import Products from './Products';

const EditProd = () => {

    return (
        <div>
        <h1 style={{textAlign: 'center', color: 'black'}}>Edit a product</h1>
            <Products edit={true}/>
        </div>
    )
}
export default EditProd;