import { Route, Routes } from 'react-router-dom'
import ChangePassword from '@app/pages/ChangePassword'
import DetailWisata from '@app/pages/DetailWisata'
import Dashboard from '@app/pages/Dashboard'

const Authenticated = () => {
  return (
        <Routes>
            <Route path='*' element={<Dashboard/>}/>
            <Route path='/ubah-password' element={<ChangePassword/>}/>
            <Route path='/detail/:slug' element={<DetailWisata/>}/>
        </Routes>
  )
}

export default Authenticated