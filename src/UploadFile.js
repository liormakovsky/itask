import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import { uploadFile } from "./redux";

const UploadFile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFilePicked, setIsFilePicked] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, fileUploaded } = useSelector((state) => state.cdrReducer);

  useEffect(() => {
    if (fileUploaded) {
      navigate("/cdr-list");
    }
  }, [fileUploaded]);

  if (isLoading) {
    return (
      <div className="loading d-flex justify-content-center align-items-center mt-5">
        <FaSpinner icon="spinner" className="spinner" />
      </div>
    );
  }

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const handleSubmit = () => {
    if (!selectedFile) return;
    dispatch(uploadFile(selectedFile));
  };
  //TODO::change input value on upload
  return (
    <>
      <Formik initialValues={{ file: "" }} onSubmit={handleSubmit}>
        {() => {
          return (
            <Form className="col-4 offset-4">
              <h1>Upload CDR File</h1>
              {isFilePicked ? (
                <div>
                  <p>Filename: {selectedFile.name}</p>
                  <p>Filetype: {selectedFile.type}</p>
                  <p>Size in bytes: {selectedFile.size}</p>
                </div>
              ) : (
                <p>Select a file to show details</p>
              )}
              <div className="form-group mt-2">
                <label htmlFor="file">File</label>
                <Field
                  type="file"
                  name="file"
                  className="form-control"
                  onChange={changeHandler}
                />
              </div>
              <button
                type="submit"
                className="btn btn-outline-primary mt-2"
                disabled={!isFilePicked}
              >
                Upload File
              </button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default UploadFile;
