import { v2 as cloudinary} from "cloudinary";
import fs from 'fs'//read write update file 

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath)=>{
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary

        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        //file has been uploaded successfully
        // console.log("The file is uploaded on cloudinary",response.url)
        fs.unlinkSync(localFilePath)
        return response //returning for the user
    } catch (error) {
        fs.unlinkSync(localFilePath)//remove the locally saved temporary file as the upload operation got failed
    }
}


export {uploadOnCloudinary}