import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Demo1 from './Demo1';

const filteredNames = (query, APIData) => {
    if(!query){
        return { }
    }
    return APIData.filter((p) => p.name.common.toLowerCase().includes(query.toLowerCase()))
  } 


export default function App() {
    const [APIData, setAPIData] = useState([]);
    const [query, setQuery] = useState('');




    useEffect(() => {
        axios.get(`https://restcountries.com/v3.1/all`)
            .then((response) => {
                setAPIData(response.data);
            })
    }, [])

    const filteredItems = filteredNames(query, APIData);
 

    const handleQueryChange = (e) => {
        const value = e.target.value
          setQuery(value)
      }

    return (
        <div style={{ padding: 20 }}>
            
            find countries: {" "}
            <input
                placeholder='Search...'
                onChange={handleQueryChange}
            />
            <div style={{ marginTop: 20 }}>
            {
                (() => {
                    if(filteredItems.length >= 10){
                        return(
                            <h3>Too many matches specify another filter</h3>
                        )
                    }else if(query ===''){
                        return(
                            <p>{''}</p>
                        )
                    }else{
                        return(
                        filteredItems.map((item) => {
                            return(
                                <div key={item.name.common}> 
                                    {item.name.common}
                                </div>
                            ) 
                        })
                        )
                    }
                })()
            }                    
            </div>
        </div>
    )
}

