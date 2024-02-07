import React, { useState } from "react";
import axios from "axios";
import ButtonComponent from "./ButtonComponent";

const FileUploadForm = () => {

    const [files, setFile] = useState([]);
    const [viewfile, setViewfile] = useState([]);

    const handleFileChange = (e) => {
        setFile(e.target.files);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formdata = new FormData();
        for (let i = 0; i < files.length; i++) {
            formdata.append('images', files[i])
        }

        try {
            const response = await axios.post('http://localhost:3001/api/upload', formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }

            })
            console.log('files uploadeed')

            console.log(response.data)
            setViewfile(response.data)


        } catch (error) {
            console.log("Error", error)
        }
    }

    return (
        <>
            <ButtonComponent />
            <form onSubmit={handleSubmit}>
                <input type="file" name="images" onChange={handleFileChange} multiple />
                <input type="submit" />
            </form>

            <div>
                {viewfile.map((url,index) => (
                    <img key={index} src={url} alt="uploaded image" />
                ))}
            </div>

        </>
    )

}
export default FileUploadForm;