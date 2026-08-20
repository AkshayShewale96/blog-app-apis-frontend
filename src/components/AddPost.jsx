import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, CardBody, Container, Form, Input, Label } from 'reactstrap'
import { loadAllCategories } from '../services/category-service'
import JoditEditor from 'jodit-react'
import { createPost as doCreatePost, uploadPostImage } from '../services/post-service'
import { getCurrentUserDetail } from '../auth'
import { toast } from 'react-toastify'

const AddPost = () => {

    // this is for rich text editor(Post content) 
    const editor = useRef(null)

    // content - to solve issue use memo
    // const config={
    //     placeholder:"start typing..."
    // }

    const [categories, setCategories] = useState([])

    // used in "submit the form on server" 
    const [user, setUser] = useState(undefined)

    // for store data - to connect backend purpose
    const [post, setPost] = useState({
        title: '',
        content: '',
        categoryId: ''
    })

    // for to upload image
    const [image, setImage] = useState(null)

    // will get all categories from backend
    useEffect(
        () => {
            // used for "to submit form on server" & get getCurrentUserDetail() from "index.jsx-auth"
            setUser(getCurrentUserDetail())

            loadAllCategories().then((data) => {
                console.log(data)
                setCategories(data)
            }).catch(error => {
                console.log(error)
            })
        },
        []
    )

    // create fieldChanged function.
    const fieldChanged = (event) => {
        // console.log(event.target.name)
        setPost({ ...post, [event.target.name]: event.target.value })
    }

    // to change content only (because we used jodit editor)
    const contentFieldChanged = (data) => {
        setPost({ ...post, 'content': data })
    }

    // create createPost function
    const createPost = (event) => {
        event.preventDefault();
        // console.log("form submitted")
        // console.log(post)

        if (post.title.trim() === '') {
            toast.error('post title is required !! ')
            return
        }

        if (post.content.trim() === '') {
            toast.error('post content is required !! ')
            return
        }

        if (post.categoryId === '') {
            toast.error('select some category !! ')
            return
        }

        // submit the form on server
        post['userId'] = user.id
        doCreatePost(post).then(data => {
            // ---------to upload image---------
            uploadPostImage(image,data.postId).then(data=>{
                toast.success("image upload !!")
            }).catch(error=>{
                toast.error("Error in uploading image")
                console.log(error)
            })
            // -----------------
            toast.success("Post Created !!")
            // console.log(post)
            setPost({
                title: '',
                content: '',
                categoryId: ''
            })
        }).catch((error) => {
            toast.error("Post not created due to some error !!")
             console.log(error)
        })


    }

    // handling file/image change event

    const handleFileChange = (event) => {
        console.log(event.target.files[0])
        setImage(event.target.files[0])
    }

    return (
        <div className='wrapper'>
            <Card className='shadow-sm border-0 mt-3'>
                <CardBody>

                    {/* using this we can ses output on form only post content*/}
                    {/* {JSON.stringify(post)} */}

                    <h3>Whats going in your mind ?</h3>
                    <Form onSubmit={createPost}>

                        {/* title */}
                        <div className='my-3'>
                            <Label for='title'>Post title</Label>
                            <Input type='text'
                                id='title'
                                placeholder='enter here'
                                className='rounded-0'
                                name='title'
                                onChange={fieldChanged}
                            />
                        </div>

                        {/* content */}
                        <div className='my-3'>
                            <Label for='content'>Post Content</Label>

                            {/* <Input type='textarea'
                    id='content'
                    placeholder='enter here'
                    className='rounded-0'
                    style={{height:'200px'}} /> */}

                            <JoditEditor
                                ref={editor}
                                // config={config}
                                value={post.content}
                                onChange={contentFieldChanged}
                            />

                        </div>

                        {/* upload image/file field */}
                        <div className="mt-3">
                            <Label for='image'>Select Post Image</Label>
                            <Input id='image' type='file' onChange={handleFileChange} />
                        </div>

                        {/* category */}
                        <div className='my-3'>
                            <Label for='category'>Post Category</Label>
                            <Input type='select'
                                id='category'
                                placeholder='enter here'
                                className='rounded-0'
                                name='categoryId'
                                onChange={fieldChanged}
                                defaultValue={0} >

                                <option disabled value={0}>--select category--</option>

                                {/* write JavaScript here */}
                                {
                                    categories.map((category) => (
                                        <option value={category.categoryId} key={category.categoryId}>
                                            {category.categoryTitle}
                                        </option>
                                    ))
                                }

                            </Input>
                        </div>

                        <Container className='text-center'>
                            <Button type='submit' className='rounded-0' color='primary'>Create Post</Button>
                            <Button className='rounded-0 ms-2' color='danger'>Reset Content</Button>
                        </Container>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}
export default AddPost