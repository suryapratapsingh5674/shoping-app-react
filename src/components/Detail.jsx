import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from '../utils/Axios';
import Loding from './Loding';
import { productContext } from '../utils/Context'

function Detail() {
  
  const navigate = useNavigate();
  const [products, setproducts] = useContext(productContext);
  const [product, setproduct] = useState(null)
  const {id} = useParams();

  const getsingleproduct = async () => {
    try {
      const {data} = await axios.get(`/products/${id}`);
      setproduct(data);
      
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if(!product){
      setproduct(products.filter((p) => p.id == id)[0]);
    }
    getsingleproduct();
  }, [])

  const deleteProductHandler = (id) => {
    const FilteredProducts = products.filter((p) => p.id !== id);
    setproducts(FilteredProducts);
    localStorage.setItem("products", JSON.stringify(FilteredProducts));
    navigate("/");
  }

  return product ? (<div className='relative flex justify-center w-[70%] items-center h-full m-auto p-[10%]'>
     <Link to='/' className='text-red-300 bg-slate-600 p-1 absolute left-4 top-4 rounded-lg mb-3 mt-2'>Home</Link>
     <img className='left-[20%] absolute w-[18vw]' src={`${product.image}`}/>
     <div className='content absolute left-[57%]'>
         <h1 className='text-5xl'>{product.title}</h1>
         <h3 className='text-zinc-400 my-5'>{product.category}</h3>
         <h2 className='text-red-200'>$ {product.price}</h2>
         <p className='mb-[5%]'>{product.description}</p>
         <Link to={`/edit/${product.id}`} className='mr-5 py-2 px-5 border rounded border-blue-200 text-blue-300'>Edit</Link>
         <button onClick={() => deleteProductHandler(product.id)} className='py-2 px-5 border rounded border-red-200 text-red-300'>Delete</button>
     </div>
   </div>) : (<Loding />)
}

export default Detail