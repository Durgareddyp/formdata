import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomepageComponent from "./Components/HomepageComponent";
import AboutComponent from "./Components/AboutusComponent";
import ContactComponent from "./Components/ContactComponent";
import NotFoundComponent from "./Components/404Component";
import FormComponent from "./Components/FormComponent";
import FileUploadForm from "./Components/FileUpload";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomepageComponent />} />
        <Route path="/about" element={<AboutComponent />} />
        <Route path="/contact" element={<ContactComponent />} />
        <Route path="*" element={<NotFoundComponent />} />
        <Route path="/form" element={<FormComponent/>}/>
        <Route path="/fileupload" element={<FileUploadForm/>}/>
  
      </Routes>
    </Router>
  );
}

export default App;
