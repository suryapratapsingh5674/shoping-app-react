import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { productContext } from '../utils/Context';

function Nav() {

  const [products] = useContext(productContext);

  let distinct_category =
   products && products.reduce((acc, cv) => [...acc, cv.category], []);
  distinct_category = [...new Set(distinct_category)];
  

  const color = () => {
    return `rgba(${(Math.random()*255).toFixed()}, ${(Math.random()*255).toFixed()}, ${(Math.random()*255).toFixed()}, 0.4)`
  }
  
  return (
    <nav className='w-[15%] h-full bg-zinc-100 flex flex-col items-center pt-5'>
      <Link className='py-2 px-5 border rounded-xl border-blue-200 text-blue-300' to='/create'>Add New Product</Link>
      <hr className='my-3 w-[80%]' />
      <Link to='/' className='text-red-300 bg-slate-600 p-1 rounded-lg mb-3 mt-2'>Home</Link>
      <h1 className='text-2xl mb-3 w-[80%]'>Catogary Filter</h1>
      <div className='w-[80%]'>
        {distinct_category.map((c, i) => (
          <Link
          key={i} to={`/?category=${c}`}
          className='flex items-center mb-3'>
           <span style={{backgroundColor: color()}} className='rounded-full block w-[15px] h-[15px] mr-3'></span>{" "}{c}
         </Link>
        ))}
      </div>
    </nav>
  )
}

export default Nav