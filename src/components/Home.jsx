import React, { useContext, useEffect, useState } from 'react';
import Nav from '../components/Nav'
import { Link, useLocation } from 'react-router-dom';
import { productContext } from '../utils/Context';
import Loding from '../components/Loding'
import axios from '../utils/Axios';

function Home() {

  const [products] = useContext(productContext);
  const {search} = useLocation();
  const category = decodeURIComponent(search.split("=")[1]);
  
  const [filteredProducts, setfilteredProducts] = useState(null)

  const getproductscategory = async () => {
    try {
      const {data} = await axios.get(`/products/category/${category}`)
      setfilteredProducts(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if(!filteredProducts || category == "undefined") setfilteredProducts(products)
    if (category != "undefined") {
      getproductscategory();
      setfilteredProducts(products.filter(product => product.category == category));
    }
  }, [category, products])
  
  return products ? (
    <>
    <Nav />
    <div className='h-full w-[85%] p-5 pt-[5%] flex flex-wrap overflow-x-hidden overflow-y-auto'>
       {filteredProducts && filteredProducts.map((p, i) => (
         <Link key={p.id}
         to={`/details/${p.id}`}
         className='mr-3 mb-3 hover:text-blue-300 card p-3 border shadow rounded-xl w-[18%] h-[35vh]'>
          <div className='hover:scale-110 mb-3 w-full h-[75%] bg-contain bg-no-repeat bg-center'
          style={{
            backgroundImage: `URL(${p.image})`,
          }}></div>
          <h1 className='text-xs'>{p.title}</h1>
        </Link>
       ))}
    </div>
    </>
  ) : (
    <Loding />
  )
}

export default Home