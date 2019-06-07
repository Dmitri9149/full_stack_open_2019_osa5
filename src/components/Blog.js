import React, { useState } from 'react'
import PropTypes from 'prop-types'



const Blog = ({ blog, handleLikes, deleteBlog, displayOrNot }) => {
  const [loginVisible, setLoginVisible] = useState(true)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    handleLikes: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired,
    displayOrNot:PropTypes.object.isRequired
  }


  const showAll = { display: loginVisible ? 'none' : '' }
  const showPartly = { display: loginVisible ? '' : 'none' }

  return (
    <div style = {blogStyle}>
      <div style = {showPartly} >
        <div onClick={() => setLoginVisible(false)}>
          {blog.title} {blog.author}
        </div>
      </div>

      <div style = {showAll} className = 'whenAllAreVisible'>
        <div onClick={() => setLoginVisible(true)} className = 'allAreVisible'>
          {blog.title} {blog.author}
        </div>

        <div>
          { blog.url}
        </div>

        <div>
          <p>
              &ensp;
            {blog.likes}
              &ensp;
              likes
              &ensp;
            <button onClick = {handleLikes}>
                like
            </button>
          </p>
          <p>
              &ensp;
              added by
              &ensp;
            {blog.user.name}
              &ensp;
          </p>
          <div style = {displayOrNot } >
            <p>
                &ensp;
              <button  onClick = {deleteBlog}>
                  remove
              </button>
            </p>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Blog