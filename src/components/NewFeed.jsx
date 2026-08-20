import React, { useState } from 'react'
import { useEffect } from 'react'
import { deletePostService, loadAllPosts } from '../services/post-service'
import { Row, Col } from 'reactstrap'
// import { Row, Col, Pagination, PaginationItem, PaginationLink, Container } from 'reactstrap'
import Post from './Post'
import { toast } from 'react-toastify'
import InfiniteScroll from 'react-infinite-scroll-component'

function NewFeed() {

    const [postContent, setPostContent] = useState({
        content: [],
        lastPage: false,
        pageNumber: '',
        pageSize: '',
        totalElements: '',
        totalPages: ''
    })

    // for infinite scroll -------------------------
    const [currentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        changePage(currentPage)
    }, [currentPage])

    // for pagination 
    const changePage = (pageNumber = 0, pageSize = 5) => {

        // for pagination increment and decrement
        if (pageNumber > postContent.pageNumber && postContent.lastPage) {
            return
        }
        if (pageNumber < postContent.pageNumber && postContent.pageNumber === 0) {
            return
        }

        loadAllPosts(pageNumber, pageSize).then((data) => {
            setPostContent({
                content: [...postContent.content, ...data.content],
                lastPage: data.lastPage,
                pageNumber: data.pageNumber,
                pageSize: data.pageSize,
                totalElements: data.totalElements,
                totalPages: data.totalPages
            })
            console.log(data)
            // window.scroll(0, 0)
        }).catch(error => {
            toast.error("Error in loading post !!")
        })
    }

    // ----------- function to delete post ---same in userdashboaer & Neew feed----------------
  function deletePost(post){
    deletePostService(post.postId).then(resp=>{
      console.log(resp)
      toast.success("post is deleted..")
      
      let newPostContents = postContent.content.filter(p=>p.postId!==post.postId)
      setPostContent({...postContent, content:newPostContents})

    }).catch(error=>{
      console.log(error)
      toast.error("error in deleting post")
    })
  }

  // -----------End of function to delete post -------------

    // Infinite scroll -------------
    const changePageInfinite = () => {
        console.log("page changed")
        setCurrentPage(currentPage + 1)
    }
    // ----------------------------

    return (

        <div className="container-fluid">
            <Row>
                <Col md={
                    {
                        size: 12
                    }
                }>
                    <h1>Blogs Count ({postContent?.totalElements}) </h1>

                    {/* ---------Infinite scroll-------- */}
                    <InfiniteScroll
                        dataLength={postContent.content.length}
                        next={changePageInfinite}
                        hasMore={!postContent.lastPage}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            <p style={{ textAlign: 'center' }}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                    >
                        {
                            postContent.content.map((post) => (
                                <Post deletePost={deletePost} post={post} key={post.postId} />
                            ))
                        }
                    </InfiniteScroll>

                    {/* pagination from reactstrap ------------------------------------------------- */}

                    {/* <Container className='mt-3'>

                        <Pagination size='lg' >

                            <PaginationItem onClick={() => changePage(postContent.pageNumber - 1)} disabled={postContent.pageNumber === 0}>
                                <PaginationLink previous>
                                    Previous
                                </PaginationLink>
                            </PaginationItem>

                            {
                                [...Array(postContent.totalPages)].map((item, index) => (
                                    <PaginationItem onClick={() => changePage(index)} active={index === postContent.pageNumber} key={index}>
                                        <PaginationLink>
                                            {index + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))
                            }

                            <PaginationItem onClick={() => changePage(postContent.pageNumber + 1)} disabled={postContent.lastPage}>
                                <PaginationLink next>
                                    Next
                                </PaginationLink>
                            </PaginationItem>

                        </Pagination>

                    </Container>----------------------------------------------------------------- */}

                </Col>
            </Row>
        </div>

    )
}

export default NewFeed