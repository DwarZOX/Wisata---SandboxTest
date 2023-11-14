import Aside from '../components/Aside'
import { Route, Routes } from 'react-router-dom'
import MyProfile from './MyProfile'
import MyWisata from './MyWisata'
import CreateWisata from './CreateWisata'
import UpdateWisata from './UpdateWisata'

const Dashboard = () => {
  return (
    
    <section className="px-10 md:px-0 md:flex md:max-w-[1250px] gap-[30px] m-auto pt-[60px] pb-[104px]">
        <Aside/>
        <Routes>
            <Route path='/profil-saya' element={<MyProfile/>}/>
            <Route path='/wisata-saya' element={<MyWisata/>}/>
            <Route path='/tambah-wisata' element={<CreateWisata/>}/>
            <Route path='/ubah-wisata/:slug' element={<UpdateWisata/>}/>
        </Routes>
    </section>
  )
}

export default Dashboard