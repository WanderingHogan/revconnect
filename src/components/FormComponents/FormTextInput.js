import React, {useState, useEffect} from 'react'
import {Form, Input} from 'semantic-ui-react'
// import ShoppingCartIcon from './ShoppingCartIcon'

const FormTextInput = ({label, required, stateName, maximumLength = null, returnedValue}) => {
  const [textLength, setTextLength] = useState(0)
  useEffect(() => {
  }, [])

  const handleNewInventoryChange = event => {
    setTextLength(event.target.value.length)
    returnedValue(stateName, event)
  }

  return (
    <Form.Field>
    <label htmlFor={stateName}>{label}{required && <span  className="required-highlight"> *</span>}</label>
    <Input
      id={stateName}
      name={stateName}
      type="text"
      autoFocus
      maxLength={maximumLength}
      onChange={handleNewInventoryChange}
    />
    {maximumLength && maximumLength > 0 && 
      <small>{textLength} of {maximumLength} Character(s) left</small>
    }
  </Form.Field>
  )
}

export default FormTextInput
