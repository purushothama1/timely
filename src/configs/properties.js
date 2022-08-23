// module.exports = {
//     //Staging base url
//     //  base_url:"http://localhost:5000/"
//      base_url:"http://3.108.44.99:5000/"
//     //Production url
//     //  base_url:"http://13.233.148.98/"

//     // base_url:"https://timely-api.codewave.com/"

//   };

//   /* eslint-disable */
if (process.env.REACT_APP_STAGE === "build for dev") {
  module.exports = {
    base_url: "http://3.108.44.99/",
  };
} else if (process.env.REACT_APP_STAGE === "build for QA") {
  module.exports = {
    base_url: "https://staging-api.timelyapp.io/",
  };
} else if (process.env.REACT_APP_STAGE === "build for Prod") {
  module.exports = {
    base_url: "http://3.108.44.99/",
  };
} else {
  module.exports = {
    base_url: "http://3.108.44.99/",
  };
}
