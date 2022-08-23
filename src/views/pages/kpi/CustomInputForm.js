import React from "react";
import { useField } from "formik";
import { Label, Input } from "reactstrap";

const CustomInputForm = ({ label,labelClassName,isSubmitted, ...props }) => {
  const [field, meta] = useField(props);
  // console.log("field", field);
  // console.log("meta", meta);
  // console.log("issubmitted",isSubmitted);
  return (
    <>
      <Label className={labelClassName}>{label}</Label>
      <Input
        {...field}
        {...props}
        style={{ borderColor: meta.touched && meta.error ? "red" : "" }}
      />
      {meta.touched && meta.error && (
        <span style={{ color: "red" }}>{meta.error}</span>
      )}
    </>
  );
};

export default CustomInputForm;
