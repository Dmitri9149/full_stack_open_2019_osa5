import loginService from './services/login' 
import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

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
  


  useEffect(async () => {
    try { 
    const blogs = await blogService.getAll()
      setBlogs( blogs )
    } catch(exception) {
      notify('something is wrong insied useEffect getting blogs')
    }  
  }, [])

  const notify = (message, type='success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification({ message: null }), 5000)
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

  const handleLikesOf = async (blog)=> {
    try {
      const changedBlog = {
        title:blog.title,
        author:blog.author,
        url:blog.url,
        likes:blog.likes +1,
        user:blog.user.id
      }

      console.log('changedBlog   ', changedBlog)

      const id = blog.id

      await blogService.update(id, changedBlog)
      const renewedBlogs = await blogService.getAll()
      setBlogs(renewedBlogs)

    } catch (exception) {
      notify(`something is wrong with updates due to likes handling`)
    }

  }



if (user === null) {
  return (
    <div>
      <h2>Log in to application</h2>

      <Notification notification={notification} />

      <Togglable buttonLabel='login'>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
        
    </div>
  )
}
  

  return (
    <div>
      <h2>blogs</h2>

      <Notification notification={notification} />

      <p>{user.name} logged in</p>
      <div>
        <button onClick = {() => {
          setUser(null)
          blogService.setToken(null)
          }}
        >
        logout
        </button>
      </div>
        <h2>New Blog</h2>
        <Togglable buttonLabel="new blog">
          <BlogForm
            addBlog={addBlog}
            newTitle={newTitle}
            newUrl={newUrl}
            setNewUrl ={setNewUrl}
            setNewAuthor = {setNewAuthor}
            setNewTitle = {setNewTitle}
          />
        </Togglable>
      <div>

      </div>
      {blogs.map(blog =>
        <Blog 
        key={blog.id}
        blog={blog} 
        handleLikes = {()=> handleLikesOf(blog)}
      />
      )}
    </div>
  )
}

export default App