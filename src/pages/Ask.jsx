import React from 'react'

export function Ask() {
  return (

    <div >
        <h3>You have to be logged in to access Ask</h3>
        <div className='login'>
        <h2>Login</h2>
        
        <label for="username">username </label>
        <input type="username" />
        <label for="password">password </label>
        <input type="password" />
     <br />
        <button>login</button>
        <a href="https://my-names-not-rick.netlify.app/craziestmoments?name=5a727a72374376797c&img=https://yt3.ggpht.com/thEOik-5tRrjU1gqgjNcBzDOkrJM8dg80cQC-NUWhDiDpBxSxGqfg7ikACY2yOhFOInG9xH7Fw=s176-c-k-c0x00ffffff-no-rj&message=407e637f3770657276633767786072653774787a726437706572766337657264677879647e757e7b7e636e">Forgot your Password?</a>
        <br />
       
        <h2>Create Account</h2>
        
        <label for="username">username </label>
        <input type="username" />
        <label for="password">password </label>
        <input type="password" />
        </div>
        <br />
        <button>create account</button>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
    </div>
  )
}
