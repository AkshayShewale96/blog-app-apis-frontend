import Base from "../components/Base";
import userContext from "../context/userContext";

const About =()=> {
    return(
       <userContext.Consumer>
        {
            (object)=>(
                <Base>
                <h1>this is about page</h1>
                <p>we are building blog app</p>
                <h1>Welcome user : {object.user.login && object.user.data.user.name}</h1>
                </Base>
            )
        }
       </userContext.Consumer>
    )
};

export default About;