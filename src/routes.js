
// import Dashboard from "views/Dashboard.jsx";

import TableList from "views/TableList.jsx";
// import Typography from "views/Typography.jsx";
// import Icons from "views/Icons.jsx";
// import Maps from "views/Maps.jsx";
// import Notifications from "views/Notifications.jsx";
// import Upgrade from "views/Upgrade.jsx";
import EmployeeForm from "views/EmployeeForm.jsx";




const dashboardRoutes = [
  {
    path: "/employeeList",
    name: "Employee List",
    icon: "pe-7s-note2",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/employeeDetail",
    name: "Employee Detail",
    icon: "pe-7s-user",
    component: EmployeeForm,
    layout: "/admin"
  }
  // {
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   icon: "pe-7s-graph",
  //   component: Dashboard,
  //   layout: "/admin"
  // },
  // {
  //   path: "/client",
  //   name: "Client Profile",
  //   icon: "pe-7s-user",
  //   component: ClientForm,
  //   layout: "/admin"
  // },
  // {
  //   path: "/jobs",
  //   name: "Jobs",
  //   icon: "pe-7s-user",
  //   component: JobForm,
  //   layout: "/admin"
  // },
 
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "pe-7s-news-paper",
  //   component: Typography,
  //   layout: "/admin"
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "pe-7s-science",
  //   component: Icons,
  //   layout: "/admin"
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "pe-7s-map-marker",
  //   component: Maps,
  //   layout: "/admin"
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "pe-7s-bell",
  //   component: Notifications,
  //   layout: "/admin"
  // },
  // {
  //   upgrade: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "pe-7s-rocket",
  //   component: Upgrade,
  //   layout: "/admin"
  // }
];

export default dashboardRoutes;
