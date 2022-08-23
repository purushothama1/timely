import React from 'react'
import { Formik ,Form} from 'formik';
import CustomInputForm from './CustomInputForm';
import { advancedSchema } from './kpiFormikSchema';

const Siderbar_Formik = () => {

const handleSubmit=(values,actions)=>{
console.log(values,actions);
}

  return (
    <Formik
       initialValues={{ myname: '' }}
       validationSchema={advancedSchema}
       onSubmit={handleSubmit}
       validateOnChange={false}
       validateOnBlur={false}
     >
       {props => (
         <Form >
            <CustomInputForm
            label="User Name"
            name="myname"
            type="text"
            placeholder="Enter My Name Here"
            isSubmitted={props}
            />
           {props.errors.name && <div id="feedback">{props.errors.name}</div>}
           <button>submit</button>
         </Form>
       )}
     </Formik>
  )
}

export default Siderbar_Formik