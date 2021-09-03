import React, {useCallback,useState} from 'react'
import {useDropzone} from 'react-dropzone'
import InputView from './components/InputView'
import './App.css'
import DisplayView from './components/DisplayView'

const App = () => {
    const [dataList, setdataList] = useState([])

    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
      }, [])
      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    const listRender = dataList.map((value, index) => {
        return <DisplayView key={index.toString()} email={value.email} password={ value.password}/>
    })

    return (
        <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
        
    )
}
/*
<div className='container'>
            <InputView setdataList={setdataList} />
            {listRender}
            
        </div>
        */
export default App
