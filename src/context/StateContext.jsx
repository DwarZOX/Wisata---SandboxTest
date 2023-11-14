import { createContext, useContext,useState } from "react";
import PropTypes from "prop-types";

const Context = createContext()

export const StateContext = ({children}) => {
    const [modalLogin, setModalLogin] = useState(false)
    const [modalPopup, setModalPopup] = useState(false)
    const [isLogin, setIsLogin] = useState(false)
    const [datas, setDatas] = useState([])
    const [userProfile, setUserProfile] = useState([])


    return (
        <Context.Provider value={{modalLogin,setModalLogin,modalPopup,setModalPopup,isLogin,setIsLogin,datas,setDatas,userProfile,setUserProfile}}>{children}</Context.Provider>
    )
}

StateContext.propTypes = {
    children: PropTypes.node.isRequired
}

export const useStateContext = () => useContext(Context);