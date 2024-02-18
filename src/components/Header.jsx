
import {FaSignInAlt,FaSignOutAlt,FaUser} from 'react-icons/fa'
import {Link,useNavigate} from 'react-router-dom'
import { UseSelector,useDispatch, useSelector } from 'react-redux'
import { logout,reset } from '../features/auth/authSlice'
function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state)=> state.auth)

    const onlogout = ()=>{
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }
  return (
<div>
<header className='header'>
    <div className='logo'>
        <Link to='/'>GoalSetter</Link>
    </div>
    <ul>
        {
            user ? (
                <li>
                <button className='btn' onClick={onlogout}>
                    <FaSignOutAlt/>logOut
                </button>
            </li>
            ) :
                   (<>
                    <li>
                    <Link to='/login'>
                        <FaSignInAlt/>login
                    </Link>
                </li>
                <li>
                    <Link to='/register'>
                        <FaUser/>Register
                    </Link>
                </li>
                    </>)
        }
       
    </ul>
</header>
</div>
    )
}

export default Header