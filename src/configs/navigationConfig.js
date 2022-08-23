import React from "react";
import * as Icon from "react-feather";

const navigationConfig = [
  {
    id: "dashboard",
    title: "Dashboard",
    type: "item",
    icon: <Icon.Home size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/dashboard",
  },
  // {
  //   id: "page2",
  //   title: "Page 2",
  //   type: "item",
  //   icon: <Icon.File size={20} />,
  //   permissions: ["admin", "editor"],
  //   navLink: "/page2"
  // },
  {
    type: "groupHeader",
    groupTitle: "RUN WEEKLY SPRINT",
  },
  {
    id: "timely",
    title: "Timely",
    type: "collapse",
    icon: <Icon.List size={20} />,
    children: [
      {
        id: "task",
        title: "Task",
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["admin", "editor"],
        navLink: "/data-list/view-all-tasks",
      },
      {
        id: "overview",
        title: "Overview",
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["admin", "editor"],
        navLink: "/view-components/overview",
      },
      {
        id: "viewallsprint",
        title: "View All Sprint",
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["admin", "editor"],
        navLink: "/data-list/view-all-sprints",
      },
    ],
  },
  {
    type: "groupHeader",
    groupTitle: "MANAGE PEERS",
  },
  {
    id: "viewallpeers",
    title: "View All Peers",
    type: "item",
    icon: <Icon.Users size={20} />,
    navLink: "/data-list/manage-peer-view",
  },
  {
    type: "groupHeader",
    groupTitle: "MANAGE PROJECTS",
  },
  {
    id: "viewallprojects",
    title: "View All Projects",
    type: "item",
    icon: <Icon.List size={20} />,
    navLink: "/data-list/view-all-projects",
  },
];

export default navigationConfig;
