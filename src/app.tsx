import { useState } from 'preact/hooks'
import{ UserBar }from './components/user-bar'
import './app.css'
import {Buttons} from './generalComponents/buttons'
export function App() {

  return (
    <>
    <Buttons type='primary' text='jbj' textColor='red' accion={()=>console.log}/>
    </>
  )
}
