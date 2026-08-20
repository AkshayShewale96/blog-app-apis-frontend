import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, CardText } from 'reactstrap'
import { getCurrentUserDetail, isLoggedIn } from '../auth'
import userContext from '../context/userContext'

export function Post({post={id:-1, title:"this is default post title", content:"this is default post content"}, deletePost}) {
  const userContextData = useContext(userContext)
  const [user,setUser] = useState(null)
  const [login, setLogin] = useState(null)
  useEffect(()=>{
    setUser(getCurrentUserDetail())
    setLogin(isLoggedIn())
  },[])


  return (
    
    <Card className='border-0 shadow-sm mt-3'>
        <CardBody>
            <h1>{post.title}</h1>
            {/* convert HTML to simple text */}
            <CardText dangerouslySetInnerHTML={{__html:post.content.substring(0,50)+"....."}}>
            </CardText>
            <div>
                <Link className='btn btn-secondary border-0' to={'/posts/'+post.postId}>Read More</Link>

                {/* ------------------------to delete logged user post----------------------------- */}
                {userContextData.user.login && (user && user.id===post.user.id ? <Button onClick={()=>deletePost(post)} color='danger' className='ms-2'>Delete</Button> : "")}
                {/* ------------------------to delete logged user post----------------------------- */}

            </div>
        </CardBody>
    </Card> 
  )
}

export default Post