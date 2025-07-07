import React from 'react'

function Cards({title, paragrafo}) {
  return (
        <div>
            <div>
                <div>
                    <h5>{title}</h5>
                    <p>{paragrafo}</p>
                </div>
            </div>
        </div>
  )
}

export default Cards