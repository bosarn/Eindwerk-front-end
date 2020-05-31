import { useState } from "react";

export const useField = (str = "", errorSupport = false) => {
  const [value, setValue] = useState(str);
  const [error, setError] = useState(false);

  const onChange = e => {
    setError(false);
    setValue(e.target.value);
    console.log(e.target.value)
  };

  if (errorSupport) {
    return { value, onChange, error, setError, setValue };
  } else {
    return { value, onChange };
  }
};


export default function Login() {
 

  // INPUTFIELDS STATE


  // ERROR STATE
 

  // ERROR EN LOADING AXIOS CALL
  const { error, loading } = useSelector((state) => state.user.login);

  // LOGIN FORM SUBMIT HANDLER

