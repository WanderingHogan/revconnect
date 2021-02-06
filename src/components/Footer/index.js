import React from 'react'
import {Link} from 'gatsby'
import {Segment, Container, Grid, List, Header} from 'semantic-ui-react'

const twitterLink = (
  <a href="https://twitter.com/" alt="twitter link">
    Twitter
  </a>
)
const facebookLink = (
  <a href="https://facebook.com/" alt="facebook link">
    Facebook
  </a>
)
const emailLink = (
  <a href="mailto:john@doe.com" alt="email link">
    Email
  </a>
)

const Footer = () => (
  <Segment
    vertical
    style={{
      padding: '4em 0em',
      marginTop: '3em',
      borderTop: '1px solid #f2f2f2',
    }}
  >
    <Container text>
      <Grid stackable>
        <Grid.Row>
          <Grid.Column width={5}>
            <Header as="h4" content="Stuff" />
            <List>
              <List.Item as={Link} to="/">
                Dead Link
              </List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={5}>
            <Header as="h4" content="More Stuff" />
            <List>
              <List.Item as={Link} to="/">
                Dead Link
              </List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={5}>
            <Header as="h4" content="God damn, more stuff" />
            <List>
              <List.Item as={Link} to="/">
                Dead Link
              </List.Item>
            </List>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </Segment>
)

export default Footer
