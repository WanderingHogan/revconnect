/* eslint-disable camelcase */
import React from 'react'
import { Header } from 'semantic-ui-react'



const PageHeader = ({title, clickEvent}) => {
    const handleEvent = event => {
        clickEvent(event);
      }
    return (
        <div className="ui grid title-header">
            <div className="eight wide column">
                <Header as="h1" className="left floated">{title}</Header>
            </div>
            <div className="eight wide column right floated">
                <span className="right floated" onClick={handleEvent}>
                    <i className="plus circle icon add-button"></i>
                </span>
            </div>
        </div>
    )
}
export default PageHeader