import React from 'react'

import Home from './components/Home'
import {Route, Routes } from 'react-router-dom'
import Detail from './components/Detail'
import Create from './components/Create'
import Edit from './components/Edit'

function App() {
  return <div className='h-screen w-screen flex'>
    
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/create' element={<Create />}/>
      <Route path='/details/:id' element={<Detail/>}/>
      <Route path='/edit/:id' element={<Edit />}/>
    </Routes>
  </div>
}

export default App