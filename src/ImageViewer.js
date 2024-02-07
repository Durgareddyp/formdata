import React from "react";

const ImageViewer = () => {

    return (<>
        <div>
            <form >
                <input type="text" name='title' placeholder="Image Title" />
                <input type="file" name="files" multiple />
                <input type="submit" />
            </form>

        </div>
    </>)
}
export default ImageViewer;
