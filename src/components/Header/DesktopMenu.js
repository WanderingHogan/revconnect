import React, {useState, useEffect} from 'react'
import {Link, withPrefix} from 'gatsby'
import {Menu, Container, Icon} from 'semantic-ui-react'
// import ShoppingCartIcon from './ShoppingCartIcon'
import Logo from './Logo'

const DesktopMenu = ({location: {pathname}, token, signout}) => {
  const [activeItem, setActiveItem] = useState(pathname)

  useEffect(() => {
    setActiveItem(pathname)
  }, [pathname])

  return (
    <Menu size="huge" borderless pointing>
      <Container text>
        <Menu.Item
          active={activeItem === withPrefix('/')}
          as={Link}
          to="/"
          header
        >
          <Logo />
        </Menu.Item>
        {/* {token ? (
          <Menu.Menu position="right">
            <Menu.Item
              as={Link}
              to="/group/"
              active={activeItem === withPrefix('/group/')}
            >
              <Icon name="users" />
              Group
            </Menu.Item>
            <Menu.Item
              as={Link}
              to="/goals/"
              active={activeItem === withPrefix('/goals/')}
            >
              <Icon name="check square outline" />
              Goals
            </Menu.Item>
            <Menu.Item
              as={Link}
              to="/inventory/"
              active={activeItem === withPrefix('/inventory/')}
            >
              <Icon name="list alternate outline" />
              Inventory
            </Menu.Item>
            <Menu.Item onClick={signout}>Sign out</Menu.Item>
          </Menu.Menu>
        ) : (
          <Menu.Menu position="right">
            <Menu.Item
              as={Link}
              to="/register/"
              active={activeItem === withPrefix('/register/')}
            >
              Sign up
            </Menu.Item>
            <Menu.Item
              as={Link}
              to="/login/"
              active={activeItem === withPrefix('/login/')}
            >
              Sign in
            </Menu.Item>
          </Menu.Menu>
        )} */}
      </Container>
    </Menu>
  )
}

export default DesktopMenu
