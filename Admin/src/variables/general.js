// Assets
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
import avatar4 from "assets/img/avatars/avatar4.png";
import avatar5 from "assets/img/avatars/avatar5.png";
// Custom icons
import {
  AdobexdLogo,
} from "components/Icons/Icons.js";
import {
  FaArrowDown,
  FaArrowUp,
  FaBell,
  FaFilePdf,
} from "react-icons/fa";
import { SiDropbox } from "react-icons/si";

export const dashboardTableData = [
  {
    logo: AdobexdLogo,
    name: "Argon Dashboard Chakra Version",
    members: [avatar1, avatar2, avatar3, avatar4, avatar5],
    budget: "$14,000",
    progression: 60,
  },
];

export const timelineData = [
  {
    logo: FaBell,
    title: "$2400, Design changes",
    date: "22 DEC 7:20 PM",
    color: "teal.300",
  },
];
export const rtlDashboardTableData = [
  {
    logo: AdobexdLogo,
    name: "نسخة Argon Dashboard Chakra",
    members: [avatar1, avatar2, avatar3, avatar4, avatar5],
    budget: "$14,000",
    progression: 60,
  },
];

export const rtlTimelineData = [
  {
    logo: FaBell,
    title: "$2400, تغييرات في التصميم",
    date: "22 DEC 7:20 PM",
    color: "teal.300",
  },
];

export const tablesTableData = [
  {
    logo: avatar1,
    name: "Esthera Jackson",
    email: "alexa@simmmple.com",
    subdomain: "Manager",
    domain: "Organization",
    status: "Online",
    date: "14/06/21",
  }
];

export const tablesProjectData = [
  {
    logo: AdobexdLogo,
    name: "Chakra UI Version",
    budget: "$14,000",
    status: "Working",
    progression: 60,
  }

];

export const invoicesData = [
  {
    date: "March, 01, 2020",
    code: "#MS-415646",
    price: "$180",
    logo: FaFilePdf,
    format: "PDF",
  },

];

export const billingData = [
  {
    name: "Oliver Liam",
    company: "Viking Burrito",
    email: "oliver@burrito.com",
    number: "FRB1235476",
  },

];

export const newestTransactions = [
  {
    name: "Netflix",
    date: "27 March 2022, at 12:30 PM",
    price: "- $2,500",
    logo: FaArrowDown,
  },

];

export const olderTransactions = [
  {
    name: "Stripe",
    date: "26 March 2022, at 13:45 PM",
    price: "+ $800",
    logo: FaArrowUp,
  },
];

export const pageVisits = [
  {
    pageName: "/argon/",
    visitors: "4,569",
    uniqueUsers: 340,
    bounceRate: "46,53%"
  },
]

export const socialTraffic = [
  {
    referral: "Facebook",
    visitors: "1,480",
    percentage: 60,
    color: "orange",
  },
]
