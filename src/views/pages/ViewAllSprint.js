import React from "react"
import { Row, Col } from "reactstrap"
import Breadcrumbs from "../../components/@vuexy/breadCrumbs/BreadCrumb"
import ViewAllSprintConfig from "../sprint/ViewAllSprintsConfig"
import queryString from "query-string"
class ViewAllSprint extends React.Component {

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
            <ViewAllSprintConfig thumbView={false} parsedFilter={queryString.parse(this.props.location.search)} projectId={this.props.match.params.id}/>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default ViewAllSprint
