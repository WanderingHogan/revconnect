/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-use-before-define */
import React, {useState, useEffect, useContext} from 'react'
import {navigate} from 'gatsby'
import {Button, Form, Input, Segment, Modal} from 'semantic-ui-react'
import SEO from '../components/SEO'
// import FamilyMemberList from '../components/FamilyMemberListItem'
import Layout from '../components/Layout'
import AuthContext from '../components/Context/AuthContext'
import PageHeader from '../components/PageHeader'
import {getInventory, postInventory} from '../../lib/services'

const Inventory = ({location}) => {
  // const [loading, setLoading] = useState(true)
  // const [apiError, setApiError] = useState([])
  const [inventory, setInventory] = useState([])
  const {token} = useContext(AuthContext)
  const [open, setOpen] = useState(false)
  const [newInventory, setNewInventory] = useState({
    item_name: '',
    item_barcode: '',
    quantity: '',
    expiration_date: '',
  })

  const handleNewInventoryChange = e => {
    const {name, value} = e.target
    setNewInventory(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  const addInventoryItem = () => {
    postInventory(
      newInventory.item_name,
      newInventory.item_barcode,
      newInventory.quantity,
      newInventory.expiration_date,
    )
      .then(resp => {
        getUserInventory()
      })
      .catch(e => {
        // setLoading(false)
        setApiError(e.errors || e)
      })
  }

  const handleSubmit = () => {
    setOpen(false)
    addInventoryItem()
  }

  const clickEvent = () => {
    setOpen(true)
  }


  const getUserInventory = () => {
    getInventory()
      .then(data => {
        console.log(data.data)
        setInventory(data.data)
        setLoading(false)
      }).catch(e => {
        // navigate('/login/')
      })
  }

  useEffect(() => {
    if (token == null) {
      navigate('/login/')
    }
    getUserInventory()
  }, [token])

  return (
    <Layout location={location}>
      <PageHeader title="My Inventory" clickEvent={clickEvent} />
      <SEO title="Inventory" />
      {/* <FamilyMemberList
        FamilyMembers={members}
        loading={loading}
      /> */}
      {inventory &&
      <p>{JSON.stringify(inventory)}</p>}
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
      >
        <Modal.Header>Add Group Member</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleSubmit}>
            <Segment>
              <Form.Field>
                <label htmlFor="item_name">Item Name</label>
                <Input
                  id="item_name"
                  name="item_name"
                  type="text"
                  autoFocus
                  onChange={e => handleNewInventoryChange(e)}
                />
              </Form.Field>
              <Form.Field>
                <label htmlFor="item_barcode">Barcode Numbers</label>
                <Input
                  id="item_barcode"
                  name="item_barcode"
                  type="text"
                  onChange={e => handleNewInventoryChange(e)}
                />
              </Form.Field>
              <Form.Field>
                <label htmlFor="quantity">Quantity</label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="text"
                  onChange={e => handleNewInventoryChange(e)}
                />
              </Form.Field>
              <Form.Field>
                <label htmlFor="expiration_date">Expiration Date</label>
                <Input
                  id="expiration_date"
                  name="expiration_date"
                  type="text"
                  onChange={e => handleNewInventoryChange(e)}
                />
              </Form.Field>
              <Button color="black" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                content="Add"
                labelPosition="right"
                icon="checkmark"
                positive
              />
            </Segment>
          </Form>
        </Modal.Content>
      </Modal>
    </Layout>
  )
}
export default Inventory
