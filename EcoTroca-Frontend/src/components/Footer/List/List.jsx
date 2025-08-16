import React from 'react'

function List({media}) {
  return (
    <>
        <li class="nav-item">
            <a class="link-light link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover" href="#">{media}</a>
        </li>
    </>
  )
}

export default List