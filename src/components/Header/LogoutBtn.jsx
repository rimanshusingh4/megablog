import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/config'
import {Logout} from '../../store/authSlice'

function Logoutbtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {}
  return (
    <div>Logoutbtn</div>
  )
}

export default Logoutbtn