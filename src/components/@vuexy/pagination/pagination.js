import React from "react"
  import {
  Pagination,
  PaginationItem,
  PaginationLink
  } from "reactstrap"
  import {ChevronLeft, ChevronRight} from "react-feather"

 const PaginationIcons =(page)=>{
    return (
        <Pagination className="d-flex justify-content-center mt-3">
        <PaginationItem href="#" className="prev-item">
          <PaginationLink href="#" first>
            <ChevronLeft />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem active>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">4</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">5</PaginationLink>
        </PaginationItem>
        <PaginationItem href="#" className="next-item">
          <PaginationLink href="#" last>
             <ChevronRight />
          </PaginationLink>
        </PaginationItem>
    </Pagination>
    )
}
export default PaginationIcons
//   class PaginationIcons extends React.Component {

//     render() {
//       return(
//         <Pagination className="d-flex justify-content-center mt-3">
//           <PaginationItem href="#" className="prev-item">
//             <PaginationLink href="#" first>
//               <ChevronLeft />
//             </PaginationLink>
//           </PaginationItem>
//           <PaginationItem>
//             <PaginationLink href="#">1</PaginationLink>
//           </PaginationItem>
//           <PaginationItem>
//             <PaginationLink href="#">2</PaginationLink>
//           </PaginationItem>
//           <PaginationItem>
//             <PaginationLink href="#">3</PaginationLink>
//           </PaginationItem>
//           <PaginationItem active>
//             <PaginationLink href="#">4</PaginationLink>
//           </PaginationItem>
//           <PaginationItem>
//             <PaginationLink href="#">5</PaginationLink>
//           </PaginationItem>
//           <PaginationItem href="#" className="next-item">
//             <PaginationLink href="#" last>
//                <ChevronRight />
//             </PaginationLink>
//           </PaginationItem>
//       </Pagination>
//       )
//     }
//   }
//   export default PaginationIcons