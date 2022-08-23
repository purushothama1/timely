import React from "react";
import ApexHeatmapChart from "../charts/apex/ApexHeatmapChart"
import PaginationIcons from "../../components/@vuexy/pagination/pagination"
import AvailablePeersConfig from "../availability/AvailablePeersConfig"
import queryString from "query-string"

class DashBoard extends React.Component{
  render(){
    return(
      <div>
    <React.Fragment>
      <ApexHeatmapChart />
      {/* <PaginationIcons /> */}
     </React.Fragment>
     <div>
     <AvailablePeersConfig thumbView={false} parsedFilter={queryString.parse(this.props.location.search)} />
    </div>
    </div>
    );
  }
}

export default DashBoard