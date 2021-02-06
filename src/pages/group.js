import React, { useState, useEffect, useContext } from 'react'
import { navigate } from 'gatsby'
import SEO from '../components/SEO'
import FamilyMemberList from '../components/FamilyMemberListItem'
import Layout from '../components/Layout'
import AuthContext from '../components/Context/AuthContext'
import PageHeader from '../components/PageHeader'
import { getFamily, postFamily } from '../../lib/services';
import { Button, Form, Input, Segment, Modal } from 'semantic-ui-react'
// import useForm from '../components/Hooks/useForm'

const MyGroup = ({ location }) => {
  const [loading, setLoading] = useState(true)
  const [apiError, setApiError] = useState([])
  const [members, setMembers] = useState([])
  const { token } = useContext(AuthContext)
  const [open, setOpen] = useState(false)
  const [newMember, setNewMember] = useState({ name: "", species: "" })

  const handleNewMemberChange = ((e) => {
    const { name, value } = e.target;
    setNewMember(prevState => ({
      ...prevState,
      [name]: value
    }));
  })

  const handleSubmit = ((e) => {
    setOpen(false)
    addGroupMember()
  })

  const clickEvent = (() => {
    setOpen(true)
  })

  const removeMember = ((id) => {
    setMembers(members.filter(member => member.id !== id));
  })

  const addGroupMember = () => {
    // name, birthday, weight, sex, species
    postFamily(newMember.name, newMember.birthday, Number(newMember.weight), newMember.sex, newMember.species).then((data) => {
      getUserFamily()
    }).catch(e => {
      console.log('fail', e)
    })
  }
  function calculate_age(birth_month, birth_day, birth_year) {
    today_date = new Date();
    today_year = today_date.getFullYear();
    today_month = today_date.getMonth();
    today_day = today_date.getDate();
    age = today_year - birth_year;

    if (today_month < (birth_month - 1)) {
      age--;
    }
    if (((birth_month - 1) == today_month) && (today_day < birth_day)) {
      age--;
    }
    return age;
  }
  const getUserFamily = () => {
    getFamily()
      .then(data => {
        setMembers(data.data)
        setLoading(false)
      }).catch(e => {
        navigate('/login/')
      })
  }

  useEffect(() => {
    if (token == null) {
      navigate('/login/')
    }
    getUserFamily()
  }, [token])

  return (
    <Layout location={location}>
      <PageHeader title="My Group" clickEvent={clickEvent} />
      <SEO title="My Group" />
      <FamilyMemberList
        FamilyMembers={members}
        loading={loading}
        onMemberRemove={removeMember}
      />
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
      >
        <Modal.Header>Add Group Member</Modal.Header>
        <Modal.Content>
          <Form
            onSubmit={handleSubmit}>
            <Segment>
              <Form.Field>
                <label htmlFor="name">Name</label>
                <Input id="name" name="name" type="text" autoFocus onChange={(e) => handleNewMemberChange(e)} />
              </Form.Field>
              <Form.Field>
                <label htmlFor="birthday">Birthday</label>
                <Input id="birthday" name="birthday" type="text" onChange={(e) => handleNewMemberChange(e)} />
              </Form.Field>
              <Form.Field>
                <label htmlFor="weight">Weight</label>
                <Input id="weight" name="weight" type="text" onChange={(e) => handleNewMemberChange(e)} />
              </Form.Field>
              <Form.Field>
                <label htmlFor="sex">Sex</label>
                <Input id="sex" name="sex" type="text" onChange={(e) => handleNewMemberChange(e)} />
              </Form.Field>
              <Form.Field>
                <label htmlFor="species">Species</label>
                <Input id="species" name="species" type="text" onChange={(e) => handleNewMemberChange(e)} />
              </Form.Field>
              <Button color='black' onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                content="Add"
                labelPosition='right'
                icon='checkmark'
                positive
              />
            </Segment>
          </Form>

        </Modal.Content>

      </Modal>
    </Layout>
  )
}
export default MyGroup