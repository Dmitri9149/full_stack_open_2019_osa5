import React from 'react'

const BlogForm = ({
  addBlog,
  newTitle,
  newAuthor,
  newUrl
}) => {
  return(
    <div>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            {...newTitle}
            name= 'newtitle'
            reset = '*'
          />
        </div>
        <div>
          author
          <input
            {...newAuthor}
            reset = '*'
          />
        </div>
        <div>
          url
          <input
            {...newUrl}
            reset ='*'
          />
        </div>

        <button type="submit">create</button>
      </form>
    </div>
  )}
export default BlogForm