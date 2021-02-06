import React from 'react'
import {Image} from 'semantic-ui-react'

import logo from '../../images/nyrc-logo.png'

const Logo = () => (
  <Image
    size="small"
    src={logo}
    style={{marginRight: '1.5em'}}
    alt="NYCRevConnect"
  />
)

export default Logo
