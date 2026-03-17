import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import FormFill from "./FormFill";
import PreviewForm from "./PreviewForm";
import { getCourse } from "../../../Services/InstitudeServices";
import { stdAdmUpload } from "../../../Services/uploadServices";

const StdAdmission = () => {
  const fileRef = useRef(null);
  const printRef = useRef(null);
  const [courses, setCourses] = useState([]);
  const [preview, setPreview] = useState(null);
  const [printFrom, setPrintFrom] = useState(null);
  const [errshow, setErrShow] = useState({});
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    getCourse()
      .then((course) => {
        setCourses(course);
      })
      .catch((err) => {
        setServerMsg("Couse not available");
      }, []);
  });

  const handlePrint = useReactToPrint({
    contentRef: printRef,
  });

  const handleFileChange = (e) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      const file = e.target.files[0];
      setErrShow({ stdPhoto: "" });

      if (!file) {
        setIsUploading(false);
        return setErrShow({ stdPhoto: "Photo does not upload" });
      }

      const maxSize = 1 * 1024 * 1024;
      if (file.size > maxSize) {
        fileRef.current.value = "";
        setIsUploading(false);
        return setErrShow({ stdPhoto: "Image size must be less than 1MB" });
      }

      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = async () => {
        if (img.width > 400 || img.height > 400) {
          fileRef.current.value = "";
          setIsUploading(false);
          return setErrShow({
            stdPhoto: "Image dimensions must be 400x400 pixel or smaller",
          });
        }
        //  Api Call for upload
        const response = await stdAdmUpload(file);
        if (response) {
          setPreview(response.uploadUrl);
        }
        setIsUploading(false);
      };
    } catch (error) {
      setErrShow({
        stdPhoto: error.message || "Server Error",
      });
      setIsUploading(false);
    }
  };
  return (
    <>
      {!printFrom && (
        <FormFill
          courses={courses}
          handleFileChange={handleFileChange}
          errshow={errshow}
          setErrShow={setErrShow}
          isUploading={isUploading}
          fileRef={fileRef}
          preview={preview}
          setPrintFrom={setPrintFrom}
        ></FormFill>
      )}
      {printFrom && (
        <PreviewForm
          printRef={printRef}
          handlePrint={handlePrint}
          data={printFrom}
          setPrintFrom={setPrintFrom}
        ></PreviewForm>
      )}
    </>
  );
};

export default StdAdmission;
