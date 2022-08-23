import mock from "../mock"
export let dataList = [
  
  // {
  //   id: 1,
  //   order_status: "on hold",
  //   name: "Apple Watch series 4 GPS",
  //   category: "Computers",
  //   price: "69.99",
  //   popularity: { popValue: "97", color: "success" },
  //   img: require("../../assets/img/elements/apple-watch.png")
  // },
 

  {
    employeeID: 1,
    img: require("../../assets/img/elements/apple-watch.png"),
    name: "ramesh",
    role: "Frontend dev",
    designation: "Software Engineer",
    projects: "Timely, Discovery Village",
    availability:"Available",
    workMode:"WFH",
    email:"ramesh@codewave.com",
    mob:"8989898989",
    location:"Banashankari",
    block:"1st floor",
  },
  {
    employeeID: 2,
    img: require("../../assets/img/elements/apple-watch.png"),
    name: "suresh",
    role: "Frontend dev",
    designation: "Software Engineer",
    projects: "Timely, Discovery Village1",
    availability:"Available",
    workMode:"WFH1",
    email:"suresh@codewave.com",
    mob:"8989898989",
    location:"Banashankari",
    block:"1st floor1",
  },
  {
    employeeID: 3,
    img: require("../../assets/img/elements/apple-watch.png"),
    name: "rakesh",
    role: "Frontend dev",
    designation: "Software Engineer",
    projects: "Timely, Discovery Village1",
    availability:"Available",
    workMode:"WFH1",
    email:"rakesh@codewave.com",
    mob:"8989898989",
    location:"Banashankari",
    block:"1st floor1",
  },
  // {
  //   employeeID: 2,
  //   img: require("../../assets/img/elements/homepod.png"),
  //   name: "suresh",
  //   role: "Backend Dev",
  //   designation: "Software Engineer",
  //   projects: "luxcamper",
  //   availability:"Available",
  //   workMode:"WFH",
  //   email:"suresh@codewave.com",
  //   mob:"8989898989",
  //   location:"domlur",
  //   block:"2nd floor",
  // },



]

const determinePopularity = val => {
  alert(val);
  if (val >= 75) return { popValue: val, color: "success" }
  else if (val < 75 && val >= 55) return { popValue: val, color: "primary" }
  else if (val < 55 && val >= 35) return { popValue: val, color: "warning" }
  else if (val < 35 && val >= 0) return { popValue: val, color: "danger" }
  else return { popValue: 0, color: "danger" }
}

// GET DATA
mock.onGet("/api/datalist/initial-data").reply(response => {
  return [200, dataList]
})

mock.onGet("/api/datalist/data").reply(response => {
  let { page, perPage } = response
  let totalPages = Math.ceil(dataList.length / perPage)
  if (page !== undefined && perPage !== undefined) {
    let calculatedPage = (page - 1) * perPage
    let calculatedPerPage = page * perPage
    return [
      200,
      { data: dataList.slice(calculatedPage, calculatedPerPage), totalPages }
    ]
  } else {
    return [
      200,
      { data: dataList.slice(0, 4), totalPages: Math.ceil(dataList.length / 4) }
    ]
  }
})

// UPDATE DATA
mock.onPost("/api/datalist/update-data").reply(request => {
  let data = JSON.parse(request.data).obj
  dataList.map(item => {
    if (item.id === data.id) {
      // let popularity = determinePopularity(data.popularity.popValue)
      // return Object.assign(item, { ...data, popularity })
    } else {
      return item
    }
  })
  return [200]
})

// Add DATA
mock.onPost("/api/datalist/add-data").reply(request => {
  let data = JSON.parse(request.data).obj
  let highestId = Math.max.apply(
    Math,
    dataList.map(i => i.id)
  )
  dataList.unshift({
    ...data,
    id: highestId + 1,
    // popularity: determinePopularity(data.popularity.popValue)
  })
  return [200]
})

// DELETE DATA
mock.onPost("/api/datalist/delete-data").reply(request => {
  let data = JSON.parse(request.data).obj
  let index = dataList.findIndex(item => item.id === data.id)
  dataList.splice(index, 1)
  return [200]
})

// DELETE SELECTED DATA
mock.onPost("/api/datalist/delete-selected").reply(request => {
  let data = JSON.parse(request.data).arr
  let reducedArray
  ;[dataList, data].reduce((a, b) => {
    let c = b.map(j => j.id)
    return (reducedArray = a.filter(i => !c.includes(i.id)))
  })
  dataList = reducedArray
  return [200]
})
