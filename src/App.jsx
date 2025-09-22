import { useState, useCallback, useEffect} from 'react'
import './App.css'

//               PASSWORD GENERATOR

  function App(){

    const [password, setPassword] = useState('')
    const [length, setLength] = useState(8)
    const [number, setNumber] = useState(false)
    const [char, setChar] = useState(false)

    const passwordGenerator =useCallback( ()=>{
      let pass = ''
      let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

      if(number) str+='1234567890'
      if(char) str+='!@#$%&'
      

      for(let i=0; i<length; i++){
        let index = Math.floor(Math.random()*(str.length))
        pass+=str.charAt(index)
      }

  
      setPassword(pass)
    } , [number,length,char])

    useEffect(()=>{
      passwordGenerator()
    }, [length, char, number, passwordGenerator])
    
    const copyPasswordToClipboard = useCallback(()=> {
    window.navigator.clipboard.writeText(password)
    }, [password])
    
    return (
      <div className='container'>
      <div className='main'>
        <h1>Password Generator</h1>
        <div className='password-div'>
          <input  
                id='password' 
                type="text" 
                placeholder='password is ...'
                value={password}
                readOnly
                />
          <button className='copy' onClick={copyPasswordToClipboard}>Copy</button>
        </div>
        <input 
              type="range" 
              min={5} max={20}
              onChange={(e)=>setLength(Number(e.target.value))}
              step={0.1}
              id='pass-length'
              />
        <label className='pass-length' htmlFor="pass-length">Length: {length}</label>
          <div className='options'>
            <div className="checkbox-group">
              <label htmlFor="pass-num">Numbers</label>
              <input  type="checkbox"
                      id="pass-num"
                      defaultChecked={number}
                      onChange={()=>setNumber(prev => !prev)}
                      />
            </div>
            <div className="checkbox-group">
               <label         htmlFor="pass-char">Characters</label>
              <input  type="checkbox"
                      id="pass-char"
                      defaultChecked={char}
                      onChange={()=>setChar(prev => !prev)}
                      />
            </div>
          </div>
      </div>
      </div>
    )
  }

  export default App
    