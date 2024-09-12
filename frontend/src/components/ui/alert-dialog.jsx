import { Alert } from "@mui/material"


const WaringAlert = (props) => {

  return (
    <Alert severity="warning"  className="fixed right-5 bottom-5">
      {props.msg}   
    </Alert>
  )
}

const SuccessAlert = (props) => {

  return (
    <Alert severity="success"  className="fixed right-5 bottom-5">
      {props.msg}   
    </Alert>
  )
}

export {WaringAlert,SuccessAlert};