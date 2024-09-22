import React, { useContext, useState } from 'react'
import { productContext } from '../utils/Context'
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';

function Create() {
    const navigate = useNavigate()
    const [products, setproducts] = useContext(productContext);
    const [image, setimage] = useState("")
    const [category, setcategory] = useState("")
    const [price, setprice] = useState("")
    const [description, setdescription] = useState("")
    const [title, settitle] = useState("")

    const AddProductHandler = (e) => {
        e.preventDefault();

        if(title.trim().length < 5 || image.trim().length < 5 || category.trim().length < 5 || price.trim().length < 1 || description.trim().length < 5){alert("Each and Every input must have atlest 4 characters"); return;}

        const product = {
            id: nanoid(),
            title,
            image,
            category,
            price,
            description,
        };
        setproducts([...products, product]);
        localStorage.setItem("products", JSON.stringify([...products, product]));
        navigate("/");
    }

  return (
    <form onSubmit={AddProductHandler} className='flex flex-col items-center p-[5%] w-screen h-screen'>
        <h1 className='w-1/2 mb-3 text-3xl'>Add new product</h1>
        <input type="url" placeholder='image link' className='text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3' onChange={(e) => setimage(e.target.value)} value={image}/>
        <input type="text" placeholder='title' className='text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3' onChange={(e) => settitle(e.target.value)} value={title}/>
        <div className='w-1/2 flex items-center justify-between'>
            <input type="text" placeholder='category' className='text-1xl bg-zinc-100 rounded p-3 w-[48%] mb-3' onChange={(e) => setcategory(e.target.value)} value={category}/>
            <input type="number" placeholder='price' className='text-1xl bg-zinc-100 rounded p-3 w-[48%] mb-3' onChange={(e) => setprice(e.target.value)} value={price}/>
        </div>
        <textarea placeholder='Enter product description here' onChange={(e) => setdescription(e.target.value)} value={description} rows="10" className='text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3'></textarea>
        <div className='w-1/2'>
        <button type="submit" className='self-start py-2 px-5 border rounded-xl border-blue-200 text-blue-300'>Add new product</button>
        </div>
    </form>
  )
}

export default Create