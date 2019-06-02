import loginService from './services/login' 
import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

const Notification = ({ notification }) => {
  if (notification.message === null) {
    return null
  }

  const style = {
    color: notification.type === 'error' ? 'red' : 'green',
    background: 'Orange',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 2,
    padding: 10,
    marginBottom: 10,
  }

  return (
    <div style={style}>
      {notification.message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newAuthor, setNewAuthor] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newLikes, setNewLikes] = useState(0)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({
    message: null
  })


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const notify = (message, type='success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification({ message: null }), 10000)
  }
  
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      notify(`wrong username or password`)
    }
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      author: newAuthor,
      title: newTitle,
      url:newUrl,
      likes:newLikes
    }
    blogService
    .create(blogObject).then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      notify(`a new blog ${newTitle} by ${newAuthor} added`)
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
      setNewLikes('')
    })
}

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <div>
        <Notification notification={notification} />
        </div>
        <form onSubmit={handleLogin}>
        <div>
          käyttäjätunnus
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          salasana
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">kirjaudu</button>
      </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification notification={notification} />

      <p>{user.name} logged in</p>
      <div>
        <button onClick = {() => {setUser(null)} }>
        logout
        </button>
      </div>
        <h2>New Blog</h2>
        <NewBlogAddition 
          addBlog = {addBlog} 
          newAuthor = {newAuthor} setNewAuthor = {setNewAuthor}
          newTitle = {newTitle} setNewTitle ={setNewTitle}
          newUrl = {newUrl} setNewUrl = {setNewUrl}
        />
      <div>

      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

const NewBlogAddition = ({
  addBlog, 
  newTitle, setNewTitle,
  newAuthor, setNewAuthor, 
  newUrl, setNewUrl }) => {
  return(
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
  )  
}


export default App