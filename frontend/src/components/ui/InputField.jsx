import React from 'react'

function InputField(props) {

  
  const HandleInput = (event)=>{
    switch (event.target.name) {
      case "Email":
        props.HandleEmail(event.target.value);
        break;
      case "Password":
        props.HandlePassword(event.target.value);
        break;
      case "first name":
        props.HandleFname(event.target.value);
        break;
      case "last name":
        props.HandleLname(event.target.value);
        break;
      default:
        break;
    }
  }
  return (


    <div className="mt-2">
        <input
            id={props.title}
            name={props.title}
            type={props.type}
            required
            onChange={HandleInput}
            className="block w-full rounded-md outline-none p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
    </div>
  )
}

export default InputField