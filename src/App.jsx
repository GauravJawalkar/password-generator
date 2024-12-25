import { useState, useCallback, useEffect, useRef } from "react";
import toast from 'react-hot-toast';

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [symAllowed, setSymAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null)

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllowed) {
      str = str + "0123456789"
    }

    if (symAllowed) {
      str = str + "!@#$%^&*()_+"
    }

    for (let i = 1; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1)
      pass = pass + str.charAt(char)
    }

    setPassword(pass);

  }, [length, numAllowed, symAllowed]);

  useEffect(() => {
    generatePassword()
  }, [length, numAllowed, symAllowed])


  const copyPasswordToClipBoard = () => {
    const copied = window.navigator.clipboard.writeText(password)

    if (copied) {
      passwordRef.current?.select()
      console.log("This is password refrence : ", passwordRef)
      toast.success("Password copied")
    }
  }

  return (
    <section className="bg-[#1a1a1a] text-white h-screen flex items-center justify-center flex-col gap-y-8">
      <h1 className="text-2xl font-semibold">Password Generator</h1>
      <div className="">
        <input
          className="px-4 py-2 outline-none w-[500px] text-black"
          value={password}
          readOnly
          type="text"
          ref={passwordRef}
          placeholder="Password generates Here"
        />
        <button className="bg-gray-600 p-2 " onClick={copyPasswordToClipBoard}>📋</button>
      </div>
      <div className="flex items-center justify-center gap-6">
        <input
          className="cursor-pointer"
          type="range"
          value={length}
          min={6}
          max={20}
          onChange={(e) => {
            setLength(e.target.value);
          }}
          name=""
          id=""
        />
        <label>Length : {length}</label>
        <input
          className=""
          type="checkbox"
          defaultChecked={symAllowed}
          onChange={() => {
            setSymAllowed((prev) => !prev);
          }}
          name=""
          id=""
        />
        <label htmlFor="">Symbols</label>
        <input
          className=""
          type="checkbox"
          defaultChecked={numAllowed}
          onChange={() => {
            setNumAllowed((prev) => !prev);
          }}
          name=""
          id="num"
        />
        <label htmlFor="num">Numbers</label>
      </div>
    </section>
  );
}

export default App;
