import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const passwordRef = useRef(null);

  const passwordGenrator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (numberAllowed) str += '123456789';
    if (charAllowed) str += '()*&^%$#@!_|}{?<>';

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  useEffect(() => {
    passwordGenrator();
  }, [length, numberAllowed, charAllowed, setPassword]);

  function numberSet() {
    setNumberAllowed((prev) => !prev);
  }

  const copyToClipBoard = useCallback(() => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0, 9);
    window.navigator.clipboard.writeText(password);
    console.log(password);
  }, [password]);

  return (
    <>
      <div
        style={{
          backgroundColor: 'grey',
          padding: '20px',
        }}
      >
        Text Genereator
        <div>
          <input type="text" value={password} ref={passwordRef} readOnly />
          <button onClick={copyToClipBoard}>Copy</button>
        </div>
        <div>
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <label htmlFor="label">length: {length}</label>

          <input type="checkbox" onChange={numberSet} />
          <label htmlFor="number">Number</label>

          <input
            type="checkbox"
            onChange={() => setCharAllowed((prev) => !prev)}
          />
          <label htmlFor="number">Character</label>
        </div>
      </div>
    </>
  );
}

export default App;
