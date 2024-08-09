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

export const costumeRecruiterOnBoardFormControls = [
  {
    name: "name",
    label: "Name",
    placeholder: "Enter your name",
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

//------------------------------------------------------------
export function handleCreationTime(time) {
  if (!time) return;

  const creationDate = new Date(time);
  const currentDate = new Date();
  const yesterday = new Date(); //muszáj megadni, hogy aztán tudjuk módosítani
  yesterday.setDate(currentDate.getDate() - 1);
  yesterday.setHours(0, 0, 0, 0);

  const creationDateMidnight = new Date(creationDate); //mivel napokat hasonlítunk össze ezért kell, hogy 0:00-ra állítsuk az időt
  creationDateMidnight.setHours(0, 0, 0, 0);

  // ma volt létrehozva
  if (creationDateMidnight.getTime() === new Date().setHours(0, 0, 0, 0)) {
    return `Today ${creationDate.toLocaleTimeString("en-UK", {
      hour: "2-digit", //2-digit: 0-23-as formátumban jeleníti meg az órát
      minute: "2-digit", //2-digit: 0-59-es formátumban jeleníti meg a percet
    })}`;
  }
  // tegnap volt létrehozva
  else if (creationDateMidnight.getTime() === yesterday.getTime()) {
    return `Yesterday ${creationDate.toLocaleTimeString("en-UK", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }
  // legalább tegnap előtt volt létrehozva
  else {
    return creationDate.toLocaleDateString("en-UK", {
      month: "long",
      day: "numeric",
    });
  }
}

//------------------------------------------------------------
export function capitalize(s) {
  return s[0].toUpperCase() + s.slice(1);
}

//------------------------------------------------------------
export const LoadingSpinner = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`animate-spin ${className}`}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

//------------------------------------------------------------
export const slideShowContent = [
  {
    description:
      "Kondor has been a game-changer for my job search. The platform is incredibly user-friendly, with intuitive navigation and a sleek design. I appreciated the personalized job recommendations that matched my skills and preferences perfectly.",
    image: "/images/avatar1.png",
    reviewer: "Jessica",
  },
  {
    description:
      "I’ve used several job searching platforms in the past, but Kondor stands out for its accuracy and ease of use. The filtering options are excellent, allowing me to narrow down my search to exactly what I was looking for. ",
    image: "/images/avatar2.png",
    reviewer: "Rebecca",
  },
  {
    description:
      "The quality of job listings is top-notch, with reputable companies and competitive salaries. The application process is seamless, and I love that I can track my application status directly through the site. ",
    image: "/images/avatar3.png",
    reviewer: "Anna",
  },
  {
    description:
      "Kondor made my job hunt so much less stressful. The site is well-organized, and it’s clear that they put a lot of thought into the user experience. The detailed company profiles and employee reviews helped me make informed decisions about where to apply.",
    image: "/images/avatar4.png",
    reviewer: "John",
  },
  {
    description:
      "I was impressed by the breadth of industries and roles available on the platform. Kondor’s customer service is also excellent—when I had a question about my profile, they responded promptly and were extremely helpful. ",
    image: "/images/avatar5.png",
    reviewer: "Tony",
  },
  {
    description:
      "Kondor truly exceeded my expectations. From the moment I signed up, I was impressed by how easy it was to create a profile and start searching for jobs. The platform offers a great mix of remote and in-office opportunities, which was perfect for my needs.",
    image: "/images/avatar6.png",
    reviewer: "Ezekiel",
  },
  {
    description:
      "Kondor has been a game-changer for my job search. The platform is incredibly user-friendly, with intuitive navigation and a sleek design. I appreciated the personalized job recommendations that matched my skills and preferences perfectly.",
    image: "/images/avatar1.png",
    reviewer: "Jessica",
  },
  {
    description:
      "I’ve used several job searching platforms in the past, but Kondor stands out for its accuracy and ease of use. The filtering options are excellent, allowing me to narrow down my search to exactly what I was looking for. ",
    image: "/images/avatar2.png",
    reviewer: "Rebecca",
  },
  {
    description:
      "The quality of job listings is top-notch, with reputable companies and competitive salaries. The application process is seamless, and I love that I can track my application status directly through the site. ",
    image: "/images/avatar3.png",
    reviewer: "Anna",
  },
  {
    description:
      "Kondor made my job hunt so much less stressful. The site is well-organized, and it’s clear that they put a lot of thought into the user experience. The detailed company profiles and employee reviews helped me make informed decisions about where to apply.",
    image: "/images/avatar4.png",
    reviewer: "John",
  },
  {
    description:
      "I was impressed by the breadth of industries and roles available on the platform. Kondor’s customer service is also excellent—when I had a question about my profile, they responded promptly and were extremely helpful. ",
    image: "/images/avatar5.png",
    reviewer: "Tony",
  },
  {
    description:
      "Kondor truly exceeded my expectations. From the moment I signed up, I was impressed by how easy it was to create a profile and start searching for jobs. The platform offers a great mix of remote and in-office opportunities, which was perfect for my needs.",
    image: "/images/avatar6.png",
    reviewer: "Ezekiel",
  },
];

export const membershipPlans = [
  {
    heading: "Tier 1",
    price: "17",
    type: "basic",
    description:
      "We recommend this plan for individuals, freelancers, and smaller teams.",
  },
  {
    heading: "Tier 2",
    price: "50",
    type: "teams",
    description:
      "This is a great match for growing companies and medium-sized teams. The max number of users is 15.",
    extra: "2 months",
  },
  {
    heading: "Tier 3",
    price: "100",
    type: "enterprise",
    description:
      "This plan is designed for large companies and organizations. The max number of users is 50.",
    extra: "5 months",
  },
];
