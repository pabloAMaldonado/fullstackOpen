import { createContext, useReducer, useContext } from "react"
import PropTypes from 'prop-types'

import notiReducer, { NotiContext } from "../reducers/notiReducer"

const NotiContextProvider = (props) => {
    const [noti, notiDispatch] = useReducer(notiReducer, '')
    return(
        <NotiContext.Provider value={[noti, notiDispatch]}>
            {props.children}
        </NotiContext.Provider>
    )
}

NotiContextProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export default NotiContextProvider