import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import DetailWisata from '@app/pages/DetailWisata'
import Authenticated from './Authenticated'
import Cookies from 'js-cookie'
import { useStateContext } from '@app/context/StateContext'
import Home from '@app/pages/Home'

const Unauthenticated = () => {
    const {isLogin, setIsLogin} = useStateContext()
    const isHaveAccess = Cookies.get('access')
    
    useEffect(() => {
        if(isHaveAccess && isHaveAccess !== ''){
            setIsLogin(true)
        } else {
            setIsLogin(false)
        }
    }, [isHaveAccess,setIsLogin])
    
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        {isLogin && (<Route path='/dashboard/*' element={<Authenticated/>}/>)}
        <Route path='/detail/:slug' element={<DetailWisata/>}/>
    </Routes>
  )
}

export default Unauthenticated