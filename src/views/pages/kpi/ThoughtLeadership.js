import React from "react";
import { Col, Container, Row, Button } from "reactstrap";

const ThoughtLeadership = () => {
  const handleTextAreaChange = () => {};
  return (
    <Container>
      <Row className="thoughtLeader-wraper">
        <Col
          className="thoughtLeader-heading"
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          xxl={12}
        >
          Innovations, experiments, unique try-outs & more
        </Col>
        <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <label htmlFor="domain" className="tl-domain-label">
            Domain
            <select id="domain" name="domain" className="tl-domain-select">
              <option>1</option>
              <option>2</option>
            </select>
          </label>
        </Col>
        <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <label htmlFor="teammate" className="tl-domain-label">
            Teammate(s)
            <select id="teammate" name="teammate" className="tl-domain-select">
              <option>1</option>
              <option>2</option>
            </select>
          </label>
        </Col>
        <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <label htmlFor="link" className="tl-domain-label">
            Link
            <input
              type="text"
              id="link"
              name="link"
              className="tl-domain-input"
            />
          </label>
        </Col>
        <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <label htmlFor="myfile" className="tl-domain-label">
            Snapshot
            <div className="tl-domain-input">
              <div className="tl-filetype-icon">
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 20 20"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g
                    id="Page-1-Duplicate"
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                  >
                    <g
                      id="KPIs---Thought-leadership"
                      transform="translate(-1329.000000, -484.000000)"
                      fill="#000000"
                      fill-rule="nonzero"
                    >
                      <g
                        id="Group-20"
                        transform="translate(310.000000, 303.000000)"
                      >
                        <g
                          id="Group-19"
                          transform="translate(36.000000, 69.000000)"
                        >
                          <g
                            id="Group-15-Copy-3"
                            transform="translate(568.000000, 85.000000)"
                          >
                            <g
                              id="upload"
                              transform="translate(415.000000, 27.000000)"
                            >
                              <path
                                d="M18.4375,12.2156766 L18.4375,17.6529678 C18.4375,18.0843523 18.0870313,18.4353119 17.65625,18.4353119 L2.34375,18.4353119 C1.91296875,18.4353119 1.5625,18.0843523 1.5625,17.6529678 L1.5625,12.2156766 L0,12.2156766 L0,17.6529678 C0,18.9471214 1.05140625,20 2.34375,20 L17.65625,20 C18.9485938,20 20,18.9471214 20,17.6529678 L20,12.2156766 L18.4375,12.2156766 Z"
                                id="Path"
                              ></path>
                              <polygon
                                id="Path"
                                points="10 0 5.14515625 4.86164245 6.25 5.96803342 9.21875 2.995126 9.21875 15.188584 10.78125 15.188584 10.78125 2.995126 13.75 5.96803342 14.8548438 4.86164245"
                              ></polygon>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
            </div>
            <input type="file" id="myfile" name="myfile" hidden />
          </label>
        </Col>
        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <label htmlFor="textarea" className="tl-domain-label">
            Description
            <textarea
            id="textarea"
            name="textarea"
            className="form-input-input-field"
            type="text"
            // value={"value"}
            onChange={handleTextAreaChange}
            disabled={false}
          ></textarea>
          </label>
         
        </Col>
        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <div className="tl-domain-btn">
            <button className="tl-domain-submitbtn">Submit</button>
            <button className="tl-domain-cancelbtn">Cancel</button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ThoughtLeadership;
