import { useState ,useCallback,useEffect,useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [Length ,setlength] = useState(8)
  const [numberallowed ,setnumberallowed] = useState(false);
  const [charallowed ,setcharallowed] = useState(false);
  const [password ,setpassword] = useState("");


  const passwordref= useRef(null )
  const passgenerator= useCallback(() =>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberallowed) str +="0123456789"
    if(charallowed) str +="!@#$%^&*{}[]~"

    for (let i = 1; i <= Length; i++) {
   let char =Math.floor(Math.random() * str.length +1)
      pass += str.charAt(char)
    }

    setpassword(pass)
  }, [Length,numberallowed,charallowed,setpassword])

   const copyPasswordToClipboard = useCallback(() =>{ 
    passwordref.current?.select()
    window.navigator.clipboard.writeText(password)},[password])
  useEffect(()=>{passgenerator()},[Length,numberallowed,charallowed,passgenerator])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800'>
        <h1 className='text-white text-center my-3'>Password generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden py-5 '>
          <input
          type="text"
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='password'
          readOnly
          ref={passwordref}
          />
<button onClick={copyPasswordToClipboard}
className =' bg-blue-700 text-white px-3 py-1 rounded-lg'>copy</button>
          
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'> 
            <input
            type="range"
            min={6}
            max={100}
            value={Length}
            className='cursor-pointer'onChange={(e) =>{setlength(e.target.value)}}
            />
            <lable>Length:{Length}</lable>
          </div>
          <div className='flex items-center gap-x-1'>
          <input
            type="checkbox"
            defaultChecked={numberallowed}
            id='numberInputed'
           onChange={() =>{setnumberallowed((prev) => !prev)}}
            />
            <lable htmlFor="numberInput">Numbers</lable>
          </div>
          <div className='flex items-center gap-x-1'>
          <input
            type="checkbox"
             defaultChecked={charallowed}
            id='characterInputed'
            onChange={() =>{setcharallowed((prev) => !prev)}}
            />
            <lable>Characters</lable>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
