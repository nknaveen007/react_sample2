import React,{useReducer} from 'react'
import Card from './Card'
import './InputView.css'
import validator from 'validator'
import { passwordStrength } from 'check-password-strength'


const emailReduser = (state, action) => {
    if (action.type === 'input_change') {
        return {value:action.val,isValid:validator.isEmail(action.val)}
    }
    else if (action.type === 'email_blur') {
        return {value:state.value,isValid:validator.isEmail(state.value)}
    }
    
    return {value:'',isValid:false}
}

const passwordReduser = (state, action) => {
    
    const colorPic = (type) => {
        let value = type === 'inp' ? passwordStrength(action.val) : passwordStrength(state.value)
        let color = 'black'
        switch (value.value) {
            case 'Too weak':
                color = '#7d2525'
                break;
            case 'Weak':
                color = '#7d257b'
                break;
            case 'Medium':
                color = '#14ffff'
                break;
            case 'Strong':
                color = '#14ff4b'
                break;
            default:
                break;
        }
      
        return {value:value.value,color}
        
    }

    if (action.type === 'input_change') {
        
        const res = colorPic('inp')
        console.log(res)
        return {value:action.val,isValidval:res.value,color:res.color}
    }
    else if (action.type === 'password_blur') {
      
        return {value:state.value,isValidval:state.isValidval,color:state.color}
    }
    
    return {value:state.value,isValidval:'normal',color:'black'}
}

const InputView = ({setdataList}) => {
    
    const [emailstate, dispatchemail] = useReducer(emailReduser, { value: '', isValid: true })
    const [passwordstate, dispatchpassword] = useReducer(passwordReduser,{value:'',isValidval:'normal',color:'black'})

    const emailOnBlure = () => {
        dispatchemail({type:'email_blur'})
    }
    const mailchange = (event) => {
        dispatchemail({type:'input_change',val:event.target.value})
    }
    
    const passwordBlure = () => {
        dispatchpassword({type:'password_blur'})
    }
    const passwordchange = (event) => {
        dispatchpassword({type:'input_change',val:event.target.value})
    }
    
    const onSubmit = (event) => {
        event.preventDefault()
        setdataList((pre) => {
            return [...pre,{email:emailstate.value,password:passwordstate.value}]
        })
        
    }

    return (
        <Card color='white'>
            <form className='form' onSubmit={onSubmit}>
                <label className="lab namelab">Eamil</label>
                <input style={{ backgroundColor: emailstate.isValid ? null : 'rgb(255, 90, 90)' }} className="inp nameinp" type="email" required={true}  onBlur={emailOnBlure} onChange={mailchange} value={emailstate.value}/>
                
                <label className="lab agelab">Password</label>
                <input className="inp ageinp" type='password' required={true} min={5} max={100} onBlur={passwordBlure} onChange={passwordchange} value={ passwordstate.value}/>
                <p style={{color:passwordstate.color}}>{ passwordstate.isValidval}</p>
                <button className="btn" type='submit'>Add user</button>
            </form>
        </Card>
    )
}

export default InputView
