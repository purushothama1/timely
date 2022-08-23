import React from "react";
import { Col, Container, Row } from "reactstrap";
import Haplomind from "../../../assets/img/Haplomind.png";

const AboutCompany = () => {
  return (
    <Container fluid>
      <Row className="about-company-wrapper">
        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <div className="d-flex align-items-center justify-content-between mb-2">
            <div className="aboutCompany-head">
              Innovations, experiments, unique try-outs & more
            </div>
            <div>
              <svg
                width="17px"
                height="17px"
                viewBox="0 0 17 17"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g
                  id="Page-1-Duplicate"
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <g
                    id="KPIs---Thought-leadership--Data-View"
                    transform="translate(-1348.000000, -327.000000)"
                    stroke="#656565"
                    stroke-width="2"
                  >
                    <g
                      id="Group-20"
                      transform="translate(310.000000, 303.000000)"
                    >
                      <g
                        id="Group"
                        transform="translate(1039.000000, 25.000000)"
                      >
                        <path
                          d="M6.42857143,2.14285714 L1.42857143,2.14285714 C0.639593215,2.14285714 0,2.78245036 0,3.57142857 L0,13.5714286 C0,14.3604068 0.639593215,15 1.42857143,15 L11.4285714,15 C12.2175496,15 12.8571429,14.3604068 12.8571429,13.5714286 L12.8571429,8.57142857"
                          id="Path"
                        ></path>
                        <path
                          d="M11.7857143,1.07142857 C12.3774479,0.479694932 13.3368378,0.479694942 13.9285714,1.07142859 C14.5203051,1.66316225 14.5203051,2.62255205 13.9285714,3.21428571 L7.14285714,10 L4.28571429,10.7142857 L5,7.85714286 L11.7857143,1.07142857 Z"
                          id="Path"
                        ></path>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </Col>
        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <div className="d-flex align-items-center justify-content-between mb-1">
            <div>
              <div className="adis-text">DOMAIN</div>
              <div className="aboutComp-boldText2">UX/UI</div>
            </div>
            <div>
              <div className="adis-text">TEAMMATES</div>
              <div className="aboutComp-boldText2">Nitin,Revanth</div>
            </div>
            <div>
              <div className="adis-text">DATE</div>
              <div className="aboutComp-boldText2">22/05/2022</div>
            </div>
          </div>
        </Col>
        <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <div className="about-c-img">
            <img src={Haplomind} alt="" />
          </div>
        </Col>
        <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <div className="adis-text">DESCRIPTION</div>
          <div className="aboutComp-boldText">
            Fluid UI design to match the ethos of the application and to have
            the experience smooth and easy for women using the app.
          </div>
          <div className="aboutComp-normText">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in reprehend
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutCompany;
