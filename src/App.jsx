import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./pages/Product"
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout"
import Login from "./pages/Login";
import CityList from "./components/CityList";
import { useEffect, useState } from "react";

const BASE_URL = "http://localhost:8000"
function App() {
  const [cities, setCities] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const[error, setError] = useState("")

  useEffect(function() {
    async function fetchCities() {
     try{ 
        setIsLoading(true)
        setError("")
        const res = await fetch(`${BASE_URL}/cities`);
        if(!res.ok) throw new Error("Something went wrong");
        const data = await res.json();
        setCities(data)}
      catch(err) {
        setError(err.message)
      }
      finally{
        setIsLoading(false)
      }
    }
    fetchCities();
  }, [])

  return <BrowserRouter>
  <Routes>
    <Route index element={<Homepage/>} />
    <Route path="product" element={<Product/>} />
    <Route path="pricing" element={<Pricing/>} />
    <Route path="login" element={<Login/>} />
    <Route path="app" element={<AppLayout/>}>
      <Route index element={<CityList/>}/>
      <Route path="cities" element={<CityList />}/>
      <Route path="countries" element={<p>List of countries</p>}/>
      <Route path="form" element={<p>form</p>}/>
    </Route>
    <Route path="*" element={<PageNotFound/>} />
  </Routes>
  </BrowserRouter>
}

export default App
