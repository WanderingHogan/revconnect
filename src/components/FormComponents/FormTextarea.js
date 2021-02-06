import React, {useState, useEffect} from 'react'
import {Form} from 'semantic-ui-react'
// import ShoppingCartIcon from './ShoppingCartIcon'

const FormTextarea = ({label, required, stateName, maximumLength = null,returnedValue}) => {
  const [textLength, setTextLength] = useState(0)
  useEffect(() => {
  }, [])

  const handleNewInventoryChange = event => {
    setTextLength(event.target.value.length)
    returnedValue(stateName, event)
  }

  return (
    <Form.Field>
    <label htmlFor={stateName}>{label}{required && <span className="required-highlight"> *</span>}</label>
    <textarea name={stateName} id={stateName} cols="40" rows="5" maxLength={maximumLength} autoFocus onChange={handleNewInventoryChange}></textarea>
    {maximumLength && maximumLength > 0 && 
      <small>{textLength} of {maximumLength} Character(s) left</small>
    }
  </Form.Field>
  )
}

export default FormTextarea
