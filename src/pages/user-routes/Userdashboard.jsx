import React, { useEffect, useState } from 'react'
import Base from '../../components/Base'
import AddPost from '../../components/AddPost'
import { Container } from 'reactstrap'
import { getCurrentUserDetail } from '../../auth'
import { deletePostService, loadPostUserWise } from '../../services/post-service'
import { toast } from 'react-toastify'
import { Post } from '../../components/Post'

const Userdashboard = () => {
  const [user, setUser] = useState({})
  const [posts, setPosts] = useState([])
  useEffect(() => {
    console.log(getCurrentUserDetail())
    setUser(getCurrentUserDetail())
    loadPostData()
  }, [])

  function loadPostData(){
    loadPostUserWise(getCurrentUserDetail().id).then(data => {
      console.log(data)
      setPosts([...data])
    }).catch(error => {
      console.log(error)
      toast.error("error in loading user posts")
    })
  }

  // ----------- function to delete post ---same in userdashboaer & Neew feed & categories---------------
  function deletePost(post){
    deletePostService(post.postId).then(resp=>{
      console.log(resp)
      toast.success("post is deleted..")
      
      let newPosts = posts.filter(p=>p.postId!==post.postId)
      setPosts([...newPosts])
    }).catch(error=>{
      console.log(error)
      toast.error("error in deleting post")
    })
  }

  // -----------End of function to delete post -------------
  return (
    <Base>
      <Container>
        <AddPost />
        {/* --------------show posts user wise------------ */}
        <h1 className='my-3'>Posts count ({posts.length})</h1>
        {
          posts.map((post, index) => {
            return (
              <Post post={post} key={index} deletePost={deletePost} />
            )
          })
        }
        {/* --------------show posts user wise------------ */}

      </Container>
    </Base>
  )
}
export default Userdashboard