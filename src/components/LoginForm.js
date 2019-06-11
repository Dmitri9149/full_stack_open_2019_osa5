import React from 'react'

const LoginForm = ({
  handleSubmit, username, password
}) => {
  console.log('username, password from Form......', username, password)
  return (
    <div>
      <h2>Kirjaudu</h2>

      <form onSubmit={handleSubmit}>
        <div>
          käyttäjätunnus
          <input
            type = {username.type}
            value = {username.value}
            onChange = {username.OnChange}
          />
        </div>
        <div>
          salasana
          <input
            type = {password.type}
            value = {password.value}
            onChange = {password.OnChange}
          />
        </div>
        <button type="submit">kirjaudu</button>
      </form>
    </div>
  )

}

export default LoginForm