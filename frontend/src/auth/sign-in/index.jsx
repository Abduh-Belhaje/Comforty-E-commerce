import { Link } from "react-router-dom";
import Logo from "../../../public/Logo Icon.png"
import InputField from "../../components/ui/InputField";
import { useState } from "react";
import {signInUser} from "../../services/authService"
import { WaringAlert } from "../../components/ui/alert-dialog";

function SignInPage() {

  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [alertMsg,setAlterMsg] = useState("");
  const [showAlert,setShowAlert] = useState(false);

  const handleEmail = (value)=>{
    setEmail(value)
  }

  const handlePassword = (value)=>{
    setPassword(value)
  }

  const handleSubmit = async ()=>{
    try {
      const response = await signInUser({email,password});
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
      <div className="lg:shadow-[0_0_25px_-10px_rgba(0,0,0,0.2)] lg:w-1/3 md:w-1/2 rounded-lg w-full flex flex-col justify-center px-6 py-6 lg:px-8 border">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src={Logo}
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Welcome Back !
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <InputField title="Email" type="email" HandleEmail={handleEmail}/>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-primary hover:text-gray-600">
                    Forgot password?
                  </a>
                </div>
              </div>
              <InputField title="Password" type="Password" HandlePassword={handlePassword} />
            </div>

            <div>
              <button
                type="button"
                onClick={handleSubmit}
                className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            don t have an account ?{' '}
            <Link to="/auth/sign-up" className="text-primary font-bold">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
