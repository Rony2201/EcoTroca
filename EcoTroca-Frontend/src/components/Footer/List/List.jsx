import React from 'react'

function List({media}) {
  return (
    <>
        <li className="nav-item">
            <a className="link-light link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover" href="#">{media}</a>
        </li>
    </>
  )
}

export default List