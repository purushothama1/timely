import React from "react";

import ReactTooltip from "react-tooltip";

export default function HealthTooptip() {
  return (
    <div className="App">
      {/* <button data-tip data-for="registerTip">
        Register
      </button> */}

      <ReactTooltip id="registerTip" place="left" effect="solid">
        <div>
          <div>
            <table className="healthtable">
              <tr>
                <th className="orghealth">ORG HEALTH</th>
                <th className="orgpercent">%</th>
              </tr>
              <tr>
                <td>Revenue</td>
                <td>10/25</td>
              </tr>
              <tr>
                <td>Profitability</td>
                <td>5/25</td>
              </tr>
              <tr>
                <td>eNPS</td>
                <td>15/25</td>
              </tr>
              <tr>
                <td>cNPS</td>
                <td>10/25</td>
              </tr>
              <tr>
                <td>TOTAL</td>
                <td>
                  <span className="total">37</span>/100
                </td>
              </tr>
            </table>
          </div>
        </div>
      </ReactTooltip>
    </div>
  );
}
