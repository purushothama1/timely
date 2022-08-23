import axios from "axios"
import { toast } from "react-toastify"
import config from "../../../configs/properties";




export const getPeerData = (params) => {
  return async dispatch => {
   const peerRequest = await axios.post(config.base_url + "v1/userlistforadmin", params)
   if(peerRequest.data.statusCode == 200)
   {
   dispatch({
    type: "GET_PEER_DATA",
    data: peerRequest.data.peers,
    peersCount:  peerRequest.data.peersCount,
    params: params.perPage
    })
   }
  }
}

export const profileImageUpload= (params)=>
{
    return async ()=>{
      let uploadedUrl="";
      let imgexte = params.file.name.substr(params.file.name.lastIndexOf('.') + 1);
     
        try{
            const ImageUploadRequest=await axios.post(config.base_url + "v1/imageUpload",
            {
              // "folder": "timelyimageupload",
              "file": params.file.name
              //  "contentType": "application/"+imgexte
          },
         )
       
          if(ImageUploadRequest.data.status_code == 200){
              var formData = new FormData();
              for (let key in ImageUploadRequest.data.response.fields) {
                formData.append(key, ImageUploadRequest.data.response.fields[key]);
              }
                formData.append("file", params.file);
              await axios.post(ImageUploadRequest.data.response.url, formData);
              uploadedUrl = ImageUploadRequest.data.response.url + '/' + ImageUploadRequest.data.response.fields.key;
                return uploadedUrl
                  }
                }
        catch(e)
        {}
    }
}

export const excelUpload= (params)=>
{
    return async ()=>{
      let uploadedUrl="";
      //let imgexte = params.file.name.substr(params.file.name.lastIndexOf('.') + 1);
     
        try{
            const ImageUploadRequest=await axios.post(config.base_url + "v1/imageUpload",
            {
              // "folder": "timelyimageupload",
              "file": params.file.name
              //  "contentType": "application/"+imgexte
          },
         )
          if(ImageUploadRequest.data.status_code == 200){
              var formData = new FormData();
              for (let key in ImageUploadRequest.data.response.fields) {
                formData.append(key, ImageUploadRequest.data.response.fields[key]);
              }
                formData.append("file", params.file);
              await axios.post(ImageUploadRequest.data.response.url, formData);
              uploadedUrl = ImageUploadRequest.data.response.url + '/' + ImageUploadRequest.data.response.fields.key;
                return ImageUploadRequest.data.response.fields.key
                  }
                }
        catch(e)
        {}
    }
}

export const getPeerUserOptions= (params)=>
{
    return async ()=>{
        try{
            const getPeerUserOptionsRequest=await axios.post(config.base_url + "v1/useroptions",params,
         )
          if(getPeerUserOptionsRequest.data.statusCode == 200){
            return getPeerUserOptionsRequest;
          }
        }
        catch(e)
        {}
    }
}

export const getBlocksInlocation= (params)=>
{
    return async ()=>{
        try{
            const getBlocksInlocationRequest=await axios.post(config.base_url + "v1/getblocksinlocation",params,
         )
          if(getBlocksInlocationRequest.data.statusCode == 200){
            return getBlocksInlocationRequest;
          }
        }
        catch(e)
        {}
    }
}


export const addPeer = (params) => {
      return async dispatch => {
      const addPeerRequest = await axios.post(config.base_url + "v1/adduser", params)
     
      if(addPeerRequest.data.statusCode == 200)
      {
        toast.success("Peer Added Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000
        })
      dispatch({
        type: "ADD_PEER_DATA",
        data: {...addPeerRequest.data.peerDetails},
        })
      }
      }
}

export const updatePeerData = (params) => {
      return async dispatch => {
      const updatePeerRequest = await axios.post(config.base_url + "v1/updateuser", params)
    
      if(updatePeerRequest.data.statusCode == 200)
      {
        toast.info("Peer data updated", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000
        })
      dispatch({
        type: "UPDATE_PEER_DATA",
        data: {...updatePeerRequest.data.peerUpdatedDetails},
        })
      }
      }
}

export const deletePeerRow = (params) => {
      return async dispatch => {
      const deletePeerRequest = await axios.post(config.base_url + "v1/removeuser", params)
    
      if(deletePeerRequest.data.statusCode == 200)
      {
          toast.info("Peer deleted", {
          position: toast.POSITION.TOP_RIGHT
        })
      dispatch({
        type: "DELETE_PEER_ROW",
        data: params.user
        })
      }
      }
}

export const searchPeersData = (params) => {
  return async () =>{
    try{
      const searchFilter = await axios.post(config.base_url + "v1/searchPeers", params)
      if(searchFilter.data.statusCode == 200)
      {
        return searchFilter.data.peers
      }
    }
    catch(e)
    {}
  }
}