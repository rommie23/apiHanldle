import { useEffect, useState } from 'react'
import './App.css'

import axios from 'axios'

function App() {

  const [search, setSearch] = useState('')
  // const[products, error, loading]= customReactQuery('/api/products?search='+search)
  const [products, setProductes] = useState([])
  const [error, setError]=useState(false)
  const [loading, setLoading]=useState(true)

  useEffect(()=>{
    const controller = new AbortController()
    ;(async()=>{
      try {
        setError(false)
        const response = await axios.get('/api/products?search='+search,{
          signal:controller.signal
        })
        console.log(response.data);
        setProductes(response.data)
        setLoading(false)
      } catch (error) {
        if(axios.isCancel(error)){
          console.log('Request Canceled', error.message);
          return
        }
        setError(true)
        setLoading(false)
      }
    })()

    // cleanup
    return()=>{
      controller.abort()
    }
  },[search])


  if (error) {
    return <h2>Something went wrong</h2>
  }
  if (loading) {
    return <h2>Loading.......</h2>
  }

  return (
    <>
      <h2>I am a pro developer</h2>
      <input type="text" placeholder='search' 
      value={search}
      onChange={(e)=> setSearch(e.target.value)}
      />
      <h2>Number of products are: {products.length}</h2>
    </>
  )
}

export default App

const customReactQuery =(urlPath)=>{
  // const [products, setProductes] = useState([])
  // const [error, setError]=useState(false)
  // const [loading, setLoading]=useState(true)

  // useEffect(()=>{
  //   ;(async()=>{
  //     try {
  //       setError(false)
  //       const response = await axios.get(urlPath)
  //       console.log(response.data);
  //       setProductes(response.data)
  //       setLoading(false)
  //     } catch (error) {
  //       setError(true)
  //       setLoading(false)
  //     }
  //   })()
  // },[search])

  // return[products, error, loading]
}