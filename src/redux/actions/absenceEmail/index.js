import axios from "axios"
import config from "../../../configs/properties";

export const AbsenceEmail= (params)=>
{
    return async ()=>{
        try{
            const absenceEmailRequest=await axios.post(config.base_url + "v1/givemailconsensus",params,
         )
          if(absenceEmailRequest.data.statusCode == 200){
            return absenceEmailRequest;
          }
        }
        catch(e)
        {}
    }
}