import React from "react"
import { Row, Col } from "reactstrap"
import ViewAllTaskConfig from "../task/ViewAllTaskConfig"
import queryString from "query-string"
class ViewAllTask extends React.Component {

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
            <ViewAllTaskConfig thumbView={false} parsedFilter={queryString.parse(this.props.location.search)} sprintId={this.props.match.params.id}/>
            </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default ViewAllTask
