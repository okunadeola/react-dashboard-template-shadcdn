/* eslint-disable no-undef */


import axios from 'axios'
import Swal from "sweetalert2"; 
import withReactContent from 'sweetalert2-react-content'

const ReactSwal = withReactContent(Swal)

const ReactSwalWithInput = ReactSwal.mixin({
  input: 'text',
})

// ** Checks if an object is empty (returns boolean)
export const isObjEmpty = obj => Object.keys(obj).length === 0

// ** React Select Theme Colors
export const selectThemeColors = theme => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: '#7367f01a', // for option hover bg-color
    primary: '#7367f0', // for selected option bg-color
    neutral10: '#7367f0', // for tags bg-color
    neutral20: '#ededed', // for input border-color
    neutral30: '#ededed' // for input hover border-color
  }
})


export const confirm = () => {
    const res = ReactSwalWithInput.fire({
      title: "Are you sure?",
      text: message,
      icon: "warning",
      showCancelButton: true,
    
    }).then(async (willExecute)=> {
      if(willExecute.isConfirmed) return  true
      return false
    });
  
    return res;
  };





  const IMAGE_UPLOAD_PRESET = import.meta.env.VITE_APP_IMAGE_UPLOAD_PRESET ;
  const CLOUDINARY_API_URL = import.meta.env.VITE_APP_CLOUDINARY_API_URL;
  

  
  /**
   * * Upload image to cloudinary storage
   * @param {string} image_base64
   * @returns {string} uploaded image remote url
   * @returns {string} uploaded image remote file type
   */
  
//   export interface CloudReturn {
//     type : string,
//     file : string
//   }
  
  
  const uploadImage = async (image_base64) => {
    try {
      const payload = {
        file: `${image_base64}`,
        upload_preset: IMAGE_UPLOAD_PRESET,
      };
  
      const response = await axios.post(CLOUDINARY_API_URL, payload);
      const json = {
        type : response?.data?.resource_type,
        file : response?.data?.secure_url,
      }
      return json;
    } catch (error) {
      return error;
    }
  };
  
  export {uploadImage};
  
  