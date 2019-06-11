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
            type = {newTitle.type}
            value={newTitle.value}
            name= 'newtitle'
            onChange={newTitle.onChange}
          />
        </div>
        <div>
          author
          <input
            value={newAuthor.value}
            onChange={newAuthor.onChange}
          />
        </div>
        <div>
          url
          <input
            value={newUrl.value}
            onChange={newUrl.onChange}
          />
        </div>

        <button type="submit">create</button>
      </form>
    </div>
  )}
export default BlogForm