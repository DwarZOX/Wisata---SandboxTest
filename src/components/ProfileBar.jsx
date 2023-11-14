import { RiArrowDownSLine } from 'react-icons/ri'
import { NavLink } from 'react-router-dom'
import { useEffect } from 'react'
import { useStateContext } from '@app/context/StateContext'
import { request } from '@app/utils/request'
import PropTypes from 'prop-types'

const ProfileBar = ({handleLogout}) => {
    const { userProfile,setUserProfile } = useStateContext()

    useEffect(() => {
      const getUserProfile = () => {

        request
          .get("/user/user/me/")
          .then((response) => {
            setUserProfile(response.data.data)
          })
          .catch((error) => {
            console.log(error);
          });
            
      }
      getUserProfile()
    }, [])
    

  return (
    <div className='group relative flex justify-center items-center gap-3 cursor-pointer'>
        <img src={userProfile?.photo} alt="avatar" className='w-[46px] h-[46px] rounded-full'/>
        <p className='text-[18px] font-[500] text-[#16192C] capitalize'>{userProfile?.username}</p>
        <span><RiArrowDownSLine className='text-[30px]'/></span>
        <span className='hidden absolute top-11 -right-8 md:-right-16 group-hover:flex flex-col gap-6 px-4 font-[500] justify-center bg-[#FFFFFF] w-[170px] h-[160px] rounded-[20px]'>
            <NavLink to={'dashboard/profil-saya'} className={'hover:text-[#F7911A]'}>Profil Saya</NavLink>
            <NavLink to={'/dashboard/ubah-password'} className={'hover:text-[#F7911A]'}>Ubah Password</NavLink>
            <NavLink onClick={handleLogout} className={'hover:text-[#F7911A]'}>Keluar</NavLink>
        </span>
    </div>
  )
}

ProfileBar.propTypes = {
  handleLogout: PropTypes.func
}

export default ProfileBar