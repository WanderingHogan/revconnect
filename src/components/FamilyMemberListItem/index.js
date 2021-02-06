/* eslint-disable camelcase */
import React, {useState, useEffect, useContext} from 'react'
// import { navigate } from 'gatsby'
import { Header, Loader, Message, Label, Segment } from 'semantic-ui-react'
import { deleteFamilyMember } from '../../../lib/services';

const FamilyMemberListItem = ({ FamilyMembers, loading, onMemberRemove }) => {
  if (loading) return <Loader active inline="centered" />
  // const [members, setMembers] = useState([])
  
  const calculate_age = (timestamp) => {
    let birthday = new Date(timestamp)
    let today_date = new Date();
    let today_year = today_date.getFullYear();
    let today_month = today_date.getMonth();
    let today_day = today_date.getDate();
    let age = today_year - birthday.getFullYear();

    if (today_month < (birthday.getMonth() - 1)) {
      age--;
    }
    if (
      (birthday.getMonth(- 1) == today_month) && (today_day < birthday.getDate())
    ) {
      age--;
    }
    return age;
  }

  const deleteMember = ((id) => {
    deleteFamilyMember(id)
      .then(data => {
        hideFamilyMember(id)
      }).catch(e => {
        console.log('e', e)
      })
  })

  const hideFamilyMember = id => {
    console.log('hiding ', id)
    onMemberRemove(id);
  }
  if (FamilyMembers.length === 0) {
    return (
      <Message warning>
        <Message.Header>No Family Members</Message.Header>
        <p>
          Add Some
        </p>
      </Message>
    )
  }

  return (
    <div>
      {FamilyMembers.map(member => {
        const {
          id,
          member_name,
          species,
          member_birthday,
          weight_lbs,
          sex
        } = member

        return (
          <Segment.Group key={id}>
            <Segment>
              <div className="ui grid">
                <div className="ten wide column">
                  <Header as="h4">{member_name} <small>({species})</small></Header>
                  <pre>{calculate_age(member_birthday)} years old, {weight_lbs} lbs {sex}</pre>
                </div>
                <div className="six wide column">
                  <span className="float-right">
                    <i onClick={() => deleteMember(id)} className="trash alternate icon trash-icon"></i>
                  </span>
                </div>
              </div>

            </Segment>
          </Segment.Group>
        )
      })}
    </div>
  )
}

export default FamilyMemberListItem;