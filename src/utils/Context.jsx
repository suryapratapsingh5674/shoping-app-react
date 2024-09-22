import React, { createContext, useEffect, useState } from 'react'
import axios from './Axios'

export const productContext = createContext();

function Context(props) {
    const [products, setproducts] = useState( null);

    const getproducts = async () => {
      try {
        const {data} = await axios("/products");
        setproducts(data);
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
      getproducts();
    }, [])

  return <productContext.Provider value={[products, setproducts]}>
    {props.children}
  </productContext.Provider>
}

export default Context 