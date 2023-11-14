import { useEffect } from 'react'
import logo from '@app/assets/logo-sandbox.png'
import Button from './Button'
import { useStateContext } from '@app/context/StateContext'
import ProfileBar from './ProfileBar'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { request } from '@app/utils/request'
import toast from 'react-hot-toast'

const Navbar = () => {
  const {setModalLogin,setIsLogin,isLogin} = useStateContext()

  const navigate = useNavigate()

  useEffect(() => {
		const checkAuthentication = () => {
			const access = Cookies.get('access');
			if (access) {
				setIsLogin(true);
			} else {
				setIsLogin(false);
			}
		};

		checkAuthentication();
	}, []);

  const handleLogout = () => {
    
    const refresh = Cookies.get('refresh');

    request
      .post("/auth/logout/", {
        refresh: refresh,
      })
      .then((response) => {
        // console.log(response)
        toast.success(`Logout Berhasil`)
        Cookies.remove('access');
        Cookies.remove('refresh');
        setIsLogin(false);
        navigate('/')
      })
      .catch((error) => {
        console.error(error)
      });
  }
  return (
    <nav className='px-10 md:px-[140px] lg:px-20 max-w-[1250px] m-auto h-[80px] flex justify-between items-center bg-white'>
      <img src={logo} alt="Logo Sandbox" className='w-[125px] h-[40px] cursor-pointer' onClick={()=>navigate('/')}/>  
      <div>
      {/* <Button style={'login'} classname={'w-[101px]'} onClick={()=>setModalLogin(true)}/> */}
        {isLogin ? (<ProfileBar handleLogout={handleLogout}/>) : (<Button style={'login'} classname={'w-[101px]'} onClick={()=>setModalLogin(true)}/>)}
      </div>
    </nav>
  )
}

export default Navbar