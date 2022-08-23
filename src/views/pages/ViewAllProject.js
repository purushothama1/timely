import React from "react"
import { Row, Col } from "reactstrap"
import Breadcrumbs from "../../components/@vuexy/breadCrumbs/BreadCrumb"
import ViewAllProjectConfig from "../project/ViewAllProjectsConfig"
import queryString from "query-string"
class ViewAllProject extends React.Component {

constructor(props){
  super(props);
  
}

  
  render() {
    return (
      
      <React.Fragment>
        {/* <Breadcrumbs
          breadCrumbTitle="List View"
          breadCrumbParent="Data List"
          breadCrumbActive="List View"
        /> */}
        <Row>
          <Col sm="12">
            <ViewAllProjectConfig thumbView={false} parsedFilter={queryString.parse(this.props.location.search)}/>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default ViewAllProject
