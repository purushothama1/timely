import * as yup from "yup";

export const advancedSchema = yup.object().shape({
  project: yup
    .string()
    .trim()
    .min(3, "Project must be at least 3 characters long")
    .required("Enter The Project Name"),
  achievedRevenue: yup.string().required("Enter The achievedRevenue"),
  achievedProfit: yup.string().required("Enter The achievedRevenue"),
  achievedENPS: yup.string().required("Enter The achievedRevenue"),
  achievedCNPS: yup.string().required("Enter The achievedRevenue"),
});
