import React, { useState } from 'react'



const Blog = ({ blog, handleLikes }) => {
  const [loginVisible, setLoginVisible] = useState(true)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  
    const showAll = { display: loginVisible ? 'none' : '' }
    const showPartly = { display: loginVisible ? '' : 'none' }

    return (
      
      <div style = {blogStyle}>
        <div style = {showPartly}>
          <div onClick={() => setLoginVisible(false)}>
            {blog.title} {blog.author}
          </div>
        </div>

        <div style = {showAll}>
          <div onClick={() => setLoginVisible(true)}>
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
              <button onClick = {()=> handleLikes()}>
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
          </div>

        </div>

      </div>
    ) 
  }

export default Blog