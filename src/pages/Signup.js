import { Button, Card, CardBody, CardHeader, Col, Container, FormFeedback, FormGroup, Input, Label, Row } from "reactstrap";
import Base from "../components/Base";
import { useEffect, useState } from "react";
import { signUp } from "../services/user-service";
import { toast } from "react-toastify";

const Signup =()=>{

    const[data, setData]=useState({
        name:'',
        email:'',
        password:'',
        about:''
    })

    const[error, setError]=useState({
        errors:{},
        isError:false
    })

    // to show on console only.
    // useEffect(()=>{
    //     console.log(data);
    // },[data])

    // handle Change
    const handleChange=(event,property)=>{
        // dynamic setting the value
        setData({...data,[property]:event.target.value})
    }

    // reset data
    const resetData=()=>{
        setData({
        name:'',
        email:'',
        password:'',
        about:''
        })
    }

    // submit the form
    const submitForm =(event)=>{
        event.preventDefault()
        console.log(data)

        // data validate
        //call server API for sending data
        signUp(data).then((resp)=>{
            console.log(resp);
            console.log("success log");
            toast.success("User is registered successfully !! User Id : " +resp.id);
            setData({
                name:'',
                email:'',
                password:'',
                about:''
            })
        }).catch((error)=>{
            console.log(error);
            console.log("Error log");
            // handle errors in proper way
            setError({
                errors:error,
                isError:true
            })
        });
    }

    return(
        <Base>
        <Container>
            <Row className="mt-4">

                {/* just checking purpose */}
                {JSON.stringify(data)}

                <Col sm={{size:6, offset:3}}>
                <Card color="dark" inverse>
                <CardHeader>
                    <h3>Fill Information To Register !!</h3>
                </CardHeader>
                <CardBody>
                    {/* creating form */}
                    <form onSubmit={submitForm}>

                        {/* Name Field */}
                        <FormGroup>
                            <Label for="name">Enter Name</Label>
                            <Input type="text"
                             placeholder="Enter here"
                              id="name"
                               onChange={(e)=>handleChange(e,'name')}
                                value={data.name}
                                invalid={error.errors?.response?.data?.name ? true : false} />

                                <FormFeedback>
                                {error.errors?.response?.data?.name}
                                </FormFeedback>
                        </FormGroup>

                        {/* Email Field */}
                        <FormGroup>
                            <Label for="email">Enter Email</Label>
                            <Input type="email"
                             placeholder="Enter here"
                              id="email"
                               onChange={(e)=>handleChange(e,'email')}
                                value={data.email}
                                invalid={error.errors?.response?.data?.email ? true : false} />

                                <FormFeedback>
                                {error.errors?.response?.data?.email}
                                </FormFeedback>
                        </FormGroup>

                        {/* Password Field */}
                        <FormGroup>
                            <Label for="password">Enter Password</Label>
                            <Input type="password"
                             placeholder="Enter here"
                              id="password"
                               onChange={(e)=>handleChange(e,'password')}
                                value={data.password}
                                invalid={error.errors?.response?.data?.password ? true : false} />

                                <FormFeedback>
                                {error.errors?.response?.data?.password}
                                </FormFeedback>
                        </FormGroup>

                        {/* About Field */}
                        <FormGroup>
                            <Label for="about">Enter About</Label>
                            <Input type="textarea"
                             placeholder="Enter here"
                              id="about"
                               style={{height:"150px"}}
                                onChange={(e)=>handleChange(e,'about')}
                                 value={data.about}
                                 invalid={error.errors?.response?.data?.about ? true : false} />

                                <FormFeedback>
                                {error.errors?.response?.data?.about}
                                </FormFeedback>
                        </FormGroup>

                        <Container className="text-center">
                            <Button outline color="light">Register</Button>
                            <Button onClick={resetData} color="secondary" className="ms-2" type="reset">Reset</Button>
                        </Container>
                    </form>
                </CardBody>
            </Card>
                </Col>
            </Row>
        </Container>
        </Base>
    );
};
export default Signup