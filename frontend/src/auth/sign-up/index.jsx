import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.png"
import InputField from "../../components/ui/InputField"
import {signUpUser} from "../../services/authService"
import { useState } from "react";
import { WaringAlert } from "../../components/ui/alert-dialog";

function SignUpPage() {
  const [u_email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [first_name,setFname] = useState();
  const [last_name,setLname] = useState();
  const [alertMsg,setAlterMsg] = useState("");
  const [showAlert,setShowAlert] = useState(false);

  const handleEmail = (value)=>{
    setEmail(value)
  }

  const handlePassword = (value)=>{
    setPassword(value)
  }
  const handleFname = (value)=>{
    setFname(value)
  }
  const handleLname = (value)=>{
    setLname(value)
  }

  const handleSubmit = async ()=>{
    try {
      const response = await signUpUser({first_name,last_name,u_email,password});
      window.localStorage.setItem("access-token",response);

      window.location.href = "/"
    } catch (error) {
      setAlterMsg("Invalid credentials Please try again")

      setShowAlert(true)
      setTimeout(()=>{
        setShowAlert(false)
      },2500)
      
    }
  }
  return (
    <div className="flex justify-center p-5 h-lvh items-center">
      { showAlert && <WaringAlert msg={alertMsg} />}
      <div className="lg:shadow-[0_0_25px_-10px_rgba(0,0,0,0.2)] lg:w-1/3 md:w1/2 rounded-lg w-full flex flex-col justify-center px-6 py-6 lg:px-8 border">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src={Logo}
            className="mx-auto h-10 w-auto"
          />
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">

            <div className="flex justify-between">
              <div className="w-5/12">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  First name
                </label>
                <InputField title="first name" type="text"  HandleFname={handleFname} />
              </div>
              <div className="w-5/12">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  last name
                </label>
                <InputField title="last name" type="text"  HandleLname={handleLname}/>
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <InputField title="Email" type="email" HandleEmail={handleEmail} />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <InputField title="Password" type="password" HandlePassword={handlePassword} />
            </div>

            <div>
              <button
                type="button"
                onClick={handleSubmit}
                className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            having already an account ?{' '}
            <Link to="/auth/sign-in" className="text-primary font-bold">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
