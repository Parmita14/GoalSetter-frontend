import { useState , useEffect} from "react"
import { FaSignInAlt } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from "../components/Spinner"
function Login() {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) =>
    state.auth
  )

  useEffect(()=>{
    if(isError){
      toast.error(message)
    }
    if(isSuccess || user){
      navigate('/')
    }
    dispatch(reset())
  },[user,isError,isSuccess,message,navigate,dispatch])


  const changeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,password
    }
    dispatch(login(userData))
  }

  if(isLoading){
    return <Spinner/>
  }
  return (
    <div>
      <section className="heading">
        <h1>
          <FaSignInAlt />User login
        </h1>
        <p>Login and set your goals</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">

            <input type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email address"
              onChange={changeHandler}
            />

            <input type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter a strong password"
              onChange={changeHandler}
            />

          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default Login