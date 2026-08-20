import CustomNavbar from "./CustomNavbar";

const Base =({title="welcome to our website",children})=>{
    return(
        <div className="container-fluid p-0 m-0">

            <CustomNavbar/>

            {children}

            <h1>this is footer</h1>
        </div>
    );
};
export default Base;