import React from 'react'

const BlogForm = ({
  addBlog,
  newTitle, setNewTitle,
  newAuthor, setNewAuthor,
  newUrl, setNewUrl
}) => {
  return(
    <div>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            type = 'text'
            value={newTitle}
            name= 'newtitle'
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            value={newUrl}
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </div>

        <button type="submit">create</button>
      </form>
    </div>
  )}
export default BlogForm