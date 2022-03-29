import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Demo1 from './Demo1';

const filteredNames = (query, APIData) => {
    if(!query){
        return APIData
    }
    return APIData.filter((p) => p.name.common.toLowerCase().includes(query.toLowerCase()))
  } 


export default function App() {
    const [APIData, setAPIData] = useState([]);
    const [query, setQuery] = useState('');
    const [detail, setDetail] = useState(false);




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
      const handleDetail = ({filteredItems}) => {
          setDetail(filteredItems.map(item => 
                <div>{item.name.common}</div>
            ))
      }
      

    return (
        <div style={{ padding: 20 }}>
            
            find countries: {" "}
            <input
                placeholder='Search...'
                onChange={handleQueryChange}
            />
            <div style={{ margin: 20 }}>
                
            { 
                (() => {
                    if(filteredItems.length > 10){
                        return(
                            <h3>Too many matches specify another filter</h3>
                        )
                    }else if(filteredItems.length ===1){
                        return(
                            filteredItems.map(item => {
                                return(
                                    <div key={item.name.common}> 
                                        <h2>{item.name.common}</h2>
                                        <div>capital {item.capital}</div>
                                        <div>capital {item.area}</div>
                                        <div>
                                            <b>languages:</b>
                                            {Object.keys(item.languages).map((language) => (
                                                 <li key={language}>
                                                     {item.languages[language]}
                                                </li>
                                            ))}
                                        </div>
                                        <div style={{width:'150px', height: '150px'}}>{item.flag}</div>
                                    </div>
                                ) 
                            })
                            
                        )
                    }else {
                        return(
                            filteredItems.map(item => {
                                return(
                                    <div key={item.name.common}> 
                                    {(() =>{
                                        if(detail){
                                            return(
                                                <div>
                                                    {item.name.common}
                                                    <button onClick={handleDetail}>show</button>
                                                </div>
                                            )                                        }
                                    })()}
                                        
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

