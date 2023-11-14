import { useEffect, useState } from 'react'
import Input from '@app/components/Input'
import Button from '@app/components/Button'
import { useNavigate } from 'react-router-dom'
import { DebounceInput } from 'react-debounce-input'
import { request } from '@app/utils/request'
import { useForm } from 'react-hook-form'
import { useStateContext } from '@app/context/StateContext'
import toast from 'react-hot-toast'

const ChangePassword = () => {
  const navigate = useNavigate()
  const [old_password, setOld_password] = useState('')
  const [show, setShow] = useState(false);
  const [isMatch, setIsMatch] = useState(false)
	const [valid, setValid] = useState('');
  const {userProfile} = useStateContext()
  const [message, setMessage] = useState('')
  const [confirmMessage, setConfirmMessage] = useState('')
  const [btnDisable, setBtnDisable] = useState(true)
  const {
    watch,
    register,
    setValue,
    handleSubmit,
  } = useForm({
    mode: 'onChange',
  })
  

  const new_password = watch('new_password')
  const confirm_password = watch('confirm_password')

    const validateUserPass = async () => {

      await request
      .post("/auth/login/", {
          email: userProfile.email,
          password: old_password
      })
      .then((response) => {
        // console.log(response)
        setValid(true)
        setMessage('Password yang dimasukkan benar')
        setShow(true)
      })
      .catch((error) => {
        // console.error(error)
        setValid(false)
        setMessage('Password yang dimasukkan salah')
      });
  }

    if(old_password !== '') {
    validateUserPass()
  }

    useEffect(()=> {
      if (new_password !== confirm_password) {
        setIsMatch(false)
        setBtnDisable(true)
        setConfirmMessage('Password tidak sesuai')
      } else if (new_password === confirm_password && new_password !== undefined && confirm_password !== undefined) {
        setIsMatch(true)
        setBtnDisable(false)
        setConfirmMessage('Password sesuai')
      } else {
        setIsMatch(false)
        setBtnDisable(true)
        setConfirmMessage('')
      }
    },[confirm_password])

  const handleUpdatePass = (values) => {

    const {new_password} = values

    request
    .post("/user/user/change-password/", {
        old_password: old_password,
        new_password: new_password
    })
    .then((response) => {
      console.log(response)
      // alert(response.data.data.msg);
      setOld_password('')
      setValue('new_password', '')
      setValue('confirm_password', '')
      navigate('/dashboard/profil-saya/')
      toast.success('Berhasil merubah password')
    })

  }

  return (
    <section className="w-full flex flex-col md:max-w-[1250px] px-10 md:px-[175px] gap-[30px] m-auto pt-[60px] pb-[104px]">
        <h1 className='text-[40px] font-[600] text-[#1F2F59]'>Ubah Password</h1>
        <form className="flex flex-col pt-[30px]" onSubmit={handleSubmit(handleUpdatePass)}>
        <label
					htmlFor='oldPassword'
					className='capitalize text-[16px] pt-[32px] pb-[8px] font-[600]'>
					Password Lama
				</label>
				<DebounceInput
					type='text'
					id='oldPassword'
					debounceTimeout={500}
					placeholder='Masukkan password lama anda'
          value={old_password}
          onChange={(e)=>setOld_password(e.target.value)}
					className='w-full h-[50px] px-4 border rounded-[10px] bg-white focus:outline-0'
					disabled={show}
				/>
				{message && (<p
					className={`${valid ? 'text-green-500' : 'text-red-500'}`}>
					{message}
				</p>)}
				{show && (
					<>
						<Input type={"password baru"} classname={"h-full"} register={{...register('new_password', { required: true })}} placeholder={'Masukkan password baru anda'}/>
              <Input type={"konfirmasi password baru"} classname={"h-full"} register={{...register('confirm_password', { required: true })}} placeholder={'Masukkan konfirmasi password baru anda'}/>

						{confirmMessage ? (<p
							className={`${isMatch ? 'text-green-500' : 'text-red-500'}`}>
							{confirmMessage}
						</p>) : null}
          <span className='flex gap-[20px] pt-[40px] pb-[220px] justify-end'>
          <Button style={'batal'} classname={'bg-[#FFFFFF] border-[1px]'} onClick={()=>navigate(-1)}/>
          <Button type='submit' style={'simpan'} disabled={btnDisable}/>
          </span>
            </>)}
        </form>
    </section>
  )
}

export default ChangePassword