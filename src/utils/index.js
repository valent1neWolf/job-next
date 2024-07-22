var countryList = require("country-list");

export const recruiterOnBoardFormControls = [
  {
    name: "name",
    label: "Name",
    placeholder: "Enter your name",
    componentType: "input",
  },
  {
    name: "companyName",
    label: "Company Name",
    placeholder: "Enter your company's name",
    componentType: "input",
  },
  {
    name: "companySize",
    label: "Company Size",
    placeholder: "Enter your company size",
    componentType: "input",
  },
  {
    name: "companyRole",
    label: "Company Role",
    placeholder: "Enter your company's role",
    componentType: "input",
  },
  {
    name: "description",
    label: "Company Description",
    placeholder: "What does your company do?",
    componentType: "textarea",
  },
];

export const initialRecruiterFormData = {
  name: "",
  companyName: "",
  companySize: "",
  companyRole: "",
  description: "",
};

export const candidateOnBoardFormControls = [
  {
    name: "name",
    label: "Name",
    placeholder: "Enter your name",
    componentType: "input",
  },
  {
    name: "skills",
    label: "Skills",
    placeholder: "Enter your skills",
    componentType: "input",
  },
  {
    name: "country",
    label: "Country",
    componentType: "select",
    options: countryList.getNames(),
    placeholder: "Select your country",
  },
  {
    name: "curentCompany",
    label: "Current Company",
    placeholder: "Enter your current company name",
    componentType: "input",
  },
  {
    name: "phone",
    label: "Phone",
    placeholder: "Enter your phone number",
    componentType: "input",
  },
  {
    name: "salary",
    label: "Expexted Salary",
    placeholder: "Enter your expected salary",
    componentType: "input",
  },
  {
    name: "resume",
    label: "Resume",
    componentType: "file",
  },
  {
    name: "coverLetter",
    label: "Cover Letter",
    placeholder: "Write a cover letter",
    componentType: "textarea",
  },
];

export const initialCandidateFormData = {
  name: "",
  skills: "",
  country: "",
  curentCompany: "",
  phone: "",
  resume: "",
  salary: "",
  coverLetter: "",
};

export const postNewJobFormControls = [
  {
    label: "Job Title",
    name: "title",
    placeholder: "Enter job title",
    componentType: "input",
  },
  {
    label: "Company Name",
    name: "companyName",
    placeholder: "Enter your company name",
    componentType: "input",
    readOnly: true,
  },
  {
    label: "Job Type",
    name: "type",
    options: ["Full-time", "Part-time", "Contract", "Internship"],
    placeholder: "Select job type",
    componentType: "select",
  },
  {
    label: "Remote",
    name: "remote",
    componentType: "select",
    options: ["Remote", "On-site", "Hybrid"],
    placeholder: "Select if the job is remote",
  },
  {
    label: "Location",
    name: "location",
    placeholder: "Enter job location",
    componentType: "input",
  },
  {
    label: "Experience",
    name: "experience",
    options: ["0-1 years", "1-3 years", "3-5 years", "5+ years"],
    placeholder: "Select experience required for the job",
    componentType: "select",
  },
  {
    label: "Description",
    name: "description",
    placeholder: "Enter job description",
    componentType: "textarea",
  },
  {
    label: "Skills",
    name: "skills",
    placeholder: "Enter required skills for the job",
    componentType: "input",
  },
  {
    label: "What we offer",
    name: "weOffer",
    placeholder: "Enter what your company offers",
    componentType: "textarea",
  },
  {
    label: "Salary",
    name: "salary",
    placeholder: "Enter job salary",
    componentType: "input",
  },
  {
    label: "Additional Info",
    name: "additionalInfo",
    placeholder: "Enter any additional info for the job",
    componentType: "textarea",
  },
];

export const initialPostNewJobFormData = {
  companyName: "",
  title: "",
  type: "",
  remote: "",
  location: "",
  experience: "",
  description: "",
  skills: "",
  weOffer: "",
  salary: "",
  additionalInfo: "",
};

export const defaultJobAccordionFilters = [
  {
    trigger: "Job Type",
    name: "type",
    content: ["Full-time", "Part-time", "Contract", "Internship"],
  },
  {
    trigger: "Remote",
    name: "remote",
    content: ["Remote", "On-site", "Hybrid"],
  },
  {
    trigger: "Location",
    name: "location",
    content: [],
  },
  {
    trigger: "Experience",
    name: "experience",
    content: ["0-1 years", "1-3 years", "3-5 years", "5+ years"],
  },
];
