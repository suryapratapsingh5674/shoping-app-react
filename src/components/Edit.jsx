import React, { useContext, useEffect, useState } from 'react'
import { productContext } from '../utils/Context'
import { nanoid } from 'nanoid';
import { useNavigate, useParams } from 'react-router-dom';

function Create() {
    const navigate = useNavigate()
    const [products, setproducts] = useContext(productContext);
    const {id} = useParams();
    const [product, setproduct] = useState({
        title: "",
        description: "",
        image: "",
        price: "",
        category: "",
    });

    const ChangeHandler = (e) => {
        console.log(e.target.name, e.target.value);
        setproduct({...product, [e.target.name]: e.target.value});
    };
    
    useEffect(() => {
        setproduct(products.filter((p) => p.id == id)[0])
    }, [id]);

    const updateHandler = (e) => {
        e.preventDefault();

        if(product.title.trim().length < 5 || product.image.trim().length < 5 || product.category.trim().length < 5 || product.price.trim().length < 1 || product.description.trim().length < 5){alert("Each and Every input must have atlest 4 characters"); return;}

        const pi = products.findIndex((p) => p.id == id);
        const copyData = [...products];
        copyData[pi] = {...products[pi], ...product};
        setproducts(copyData);
        localStorage.setItem("products", JSON.stringify(copyData));
        navigate(-1);
    }

  return (
    <form onSubmit={updateHandler} className='flex flex-col items-center p-[5%] w-screen h-screen'>
        <h1 className='w-1/2 mb-3 text-3xl'>Edit product</h1>
        <input type="url" autoComplete='off' placeholder='image link' className='text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3' name='image' onChange={ChangeHandler} value={product && product.image}/>
        <input type="text" autoComplete='off' placeholder='title' className='text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3' name='title' onChange={ChangeHandler} value={product && product.title}/>
        <div className='w-1/2 flex items-center justify-between'>
            <input type="text" autoComplete='off' placeholder='category' className='text-1xl bg-zinc-100 rounded p-3 w-[48%] mb-3' name='category' onChange={ChangeHandler} value={product && product.category}/>
            <input type="number" autoComplete='off' placeholder='price' className='text-1xl bg-zinc-100 rounded p-3 w-[48%] mb-3' name='price' onChange={ChangeHandler} value={product && product.price}/>
        </div>
        <textarea placeholder='Enter product description here' name='description' onChange={ChangeHandler} value={product && product.description} rows="10" className='text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3'></textarea>
        <div className='w-1/2'>
        <button type="submit" className='self-start py-2 px-5 border rounded-xl border-blue-200 text-blue-300'>Save</button>
        </div>
    </form>
  )
}

export default Create