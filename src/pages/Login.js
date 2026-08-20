import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Base from "../components/Base";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../services/user-service";
import { doLogin } from "../auth";
import { useNavigate } from "react-router-dom";
import userContext from "../context/userContext";

const Login =()=>{

    const userContextData = useContext(userContext)

    // to redirect on dashboard page
    const navigate = useNavigate()
    
    const [loginDetail, setLoginDetail]=useState({
        username:'',
        password:''
    })

    // handle Change function
    const handleChange=(event,field)=>{
        let actualValue=event.target.value
        setLoginDetail({
            ...loginDetail,
            [field]:actualValue
        })
    }

    // handle reset
    const handleReset=()=>{
        setLoginDetail({
            username:'',
            password:''
        })
    }

    // handleFormSubmit function
    const handleFormSubmit=(event)=>{
        event.preventDefault();
        console.log(loginDetail);

        // data validation
        if(loginDetail.username.trim()===0 || loginDetail.password.trim()===0){
            toast.error("Username or Password is required !!")
            return;
        }
        // submit the data to server to generate token
        loginUser(loginDetail).then((data)=>{
            console.log(data)

            // save the data to local storage
            doLogin(data,()=>{
                console.log("login detail is saved to local storage")
                // user context to set data
                userContextData.setUser({
                    data:data,
                    login:true
                })
                // redirect to user dashboard page.
                navigate("/user/dashboard")
            })

            toast.success("Login success !!")
        }).catch(error=>{
            console.log(error)
            if(error.response.status===400 || error.response.status===404){
                toast.error(error.response.data.message)
            }else{
                toast.error("something is wrong on server !!")
            }
        })
    };

    return(
        <Base>
        <Container>
            <Row className="mt-4">
                <Col sm={{size:6, offset:3}}>
                    <Card color="dark" inverse>
                        <CardHeader>
                            <h3>Login here !!</h3>
                        </CardHeader>
                        <CardBody>

                            <Form onSubmit={handleFormSubmit}>

                                {/* Email field */}
                                <FormGroup>
                                    <Label for="email">Enter Email</Label>
                                    <Input type="text"
                                     id="email"
                                     placeholder="Enter here"
                                     value={loginDetail.username}
                                     onChange={(e)=>handleChange(e,'username')} />
                                </FormGroup>

                                {/* Password field */}
                                <FormGroup>
                                    <Label for="password">Enter Password</Label>
                                    <Input type="password"
                                     id="password"
                                      placeholder="Enter here"
                                      value={loginDetail.password}
                                      onChange={(e)=>handleChange(e,'password')} />
                                </FormGroup>

                                <Container className="text-center">
                                <Button color="light" outline>Login</Button>
                                <Button onClick={handleReset} color="secondary" className="ms-2" type="reset">Reset</Button>
                                </Container>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
        </Base>
    );
};
export default Login