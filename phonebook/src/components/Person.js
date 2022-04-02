import React from 'react'



const Person = ({person, handleDelete, filteredItems}) => {
    return(
      <>
    
        <div>
            {person.name} {person.number} 
            <button onClick={handleDelete}>Delete</button>
        </div>
    
      </>
    )
    }

export default Person