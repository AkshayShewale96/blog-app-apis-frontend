import React, { useEffect, useState } from 'react'
import userContext from './userContext'

function UserProvider({children}) {
    const [user, setUser] = useState({
        data:{},
        login:false
    })

  return (
    // used this UserProvider in App.js all routs are childern of UserProvider.
    <userContext.Provider value={{user, setUser}}>
        {children}
    </userContext.Provider>
  )
}

export default UserProvider