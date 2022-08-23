import React from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
// import navigationConfig from "../../../../../configs/navigationConfig"
import {
  fetchAllProjects,
  fetchAllProjectsClear,
} from "../../../../../redux/actions/sidemenu";
import { connect } from "react-redux";
import SideMenuGroup from "./SideMenuGroup";
import { Badge } from "reactstrap";
import { ChevronRight, ChevronDown, ChevronUp } from "react-feather";
import * as Icon from "react-feather";
import { history } from "../../../../../history";

class SideMenuContent extends React.Component {
  constructor(props) {
    super(props);

    this.parentArr = [];
    this.collapsedPath = null;
    this.redirectUnauthorized = () => {
      history.push("/misc/not-authorized");
    };
  }
  state = {
    flag: true,
    isHovered: false,
    activeGroups: [],
    currentActiveGroup: [],
    tempArr: [],
    navigationConfig: [],
    projectList: [],
    viewMore: false,
    viewLess: false,
  };

  handleGroupClick = (id, parent = null, type = "") => {
    let open_group = this.state.activeGroups;
    let active_group = this.state.currentActiveGroup;
    let temp_arr = this.state.tempArr;
    // Active Group to apply sidebar-group-active class
    if (type === "item" && parent === null) {
      active_group = [];
      temp_arr = [];
    } else if (type === "item" && parent !== null) {
      active_group = [];
      if (temp_arr.includes(parent)) {
        temp_arr.splice(temp_arr.indexOf(parent) + 1, temp_arr.length);
      } else {
        temp_arr = [];
        temp_arr.push(parent);
      }
      active_group = temp_arr.slice(0);
    } else if (type === "collapse" && parent === null) {
      temp_arr = [];
      temp_arr.push(id);
    } else if (type === "collapse" && parent !== null) {
      if (active_group.includes(parent)) {
        temp_arr = active_group.slice(0);
      }
      if (temp_arr.includes(id)) {
        // temp_arr.splice(temp_arr.indexOf(id), 1)
        temp_arr.splice(temp_arr.indexOf(id), temp_arr.length);
      } else {
        temp_arr.push(id);
      }
    } else {
      temp_arr = [];
    }

    if (type === "collapse") {
      // If open group does not include clicked group item
      if (!open_group.includes(id)) {
        // Get unmatched items that are not in the active group
        let temp = open_group.filter(function (obj) {
          return active_group.indexOf(obj) === -1;
        });
        // Remove those unmatched items from open group
        if (temp.length > 0 && !open_group.includes(parent)) {
          open_group = open_group.filter(function (obj) {
            return !temp.includes(obj);
          });
        }
        if (open_group.includes(parent) && active_group.includes(parent)) {
          open_group = active_group.slice(0);
        }
        // Add group item clicked in open group
        if (!open_group.includes(id)) {
          open_group.push(id);
        }
      } else {
        // If open group includes click group item, remove it from open group
        open_group.splice(open_group.indexOf(id), 1);
      }
    }
    if (type === "item") {
      open_group = active_group.slice(0);
    }

    this.setState({
      activeGroups: open_group,
      tempArr: temp_arr,
      currentActiveGroup: active_group,
    });
  };

  initRender = (parentArr) => {
    this.setState({
      activeGroups: parentArr.slice(0),
      currentActiveGroup: parentArr.slice(0),
      flag: false,
    });
  };

  async componentDidMount() {
    this.initRender(this.parentArr[0] ? this.parentArr[0] : []);
    let obj = {
      company: localStorage.getItem("company"),
      level: localStorage.getItem("adminaccess"),
      user: localStorage.getItem("user"),
      token: localStorage.getItem("token"),
    };
    await this.props.fetchAllProjects(obj);
    if (this.props.projectList.length == 0) {
      let navigationConfig = [
        {
          id: "dashboard",
          title: "Dashboard",
          type: "collapse",
          permissions: ["admin", "editor"],
          navLink: "/dashboard",
          icon: <Icon.Home size={20} />,
          children: [
            {
              id: "shop",
              title: "Shop",
              type: "item",
              icon: <Icon.Users size={20} />,
              permissions: ["admin", "editor"],
              navLink: "/ecommerce/shop",
            },
          ],
        },
        {
          type: "groupHeader",
          groupTitle: "RUN WEEKLY SPRINT",
        },
        {
          id: "noProjects",
          title: "No projects added",
          type: "noProjects",
        },
        {
          id: "viewMore",
          title: !this.state.viewMore ? "View More" : "View Less",
          type: !this.state.viewMore ? "viewButtonMore" : "viewButtonLess",
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
      this.setState({
        navigationConfig,
      });
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.projectList.length != state.projectList.length) {
      return {
        projectList: props.projectList,
      };
    }
    // Return null if the state hasn't changed
    return null;
  }

  //  async componentWillUnmount() {
  //     await this.props.fetchAllProjectsClear()
  //   }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.activePath !== this.props.activePath) {
      if (this.collapsedMenuPaths !== null) {
        this.props.collapsedMenuPaths(this.collapsedMenuPaths);
      }

      this.initRender(
        this.parentArr[0] ? this.parentArr[this.parentArr.length - 1] : []
      );
    }
    if (
      prevProps.projectList.length != this.props.projectList.length ||
      this.state.viewMore ||
      this.state.viewLess
    ) {
      let projectListLength = this.state.viewMore
        ? this.state.projectList.length
        : 5;
      let projectListSideBarMenu = this.props.projectList.length
        ? this.state.projectList
            .slice(0, projectListLength)
            .map((projects, i) => ({
              id: projects._id,
              title: projects.name,
              type: "collapse",
              icon: <Icon.List size={20} />,
              children: [
                {
                  id: projects._id + "overview",
                  title: "Overview",
                  type: "item",
                  icon: <Icon.Circle size={12} />,
                  permissions: ["admin", "editor"],
                  navLink: "/view-components/overview/" + projects._id,
                },
                {
                  id: projects._id + "sprint",
                  title: "View All Sprint",
                  type: "item",
                  icon: <Icon.Circle size={12} />,
                  permissions: ["admin", "editor"],
                  navLink: "/data-list/view-all-sprints/" + projects._id,
                },
              ],
            }))
        : [
            {
              id: "noProjects",
              title: "No projects added",
              type: "noProjects",
            },
          ];

      let navigationConfig = [
        {
          id: "dashboard",
          title: "Dashboard",
          type: "collapse",
          icon: <Icon.Home size={20} />,
          permissions: ["admin", "editor"],
          navLink: "/dashboard",
          children: [
            {
              id: "analyticsDash",
              title: "Overview",
              type: "item",
              icon: <Icon.Circle size={12} />,
              permissions: ["admin", "editor"],
              navLink: "/preview",
            },
            {
              id: "eCommerceDash",
              title: "People Availability",
              type: "item",
              icon: <Icon.Circle size={12} />,
              permissions: ["admin"],
              navLink: "/dashboard",
            },
            {
              id: "feedbackdash",
              title: "360 Peer feedback",
              type: "item",
              icon: <Icon.Circle size={12} />,
              permissions: ["admin"],
              navLink: "/get-overall-peer-review",
            },
          ],
        },
        {
          type: "groupHeader",
          groupTitle: "RUN WEEKLY SPRINT",
        },
        ...projectListSideBarMenu,
        {
          id: "viewMore",
          title: !this.state.viewMore ? "View More" : "View Less",
          type: !this.state.viewMore ? "viewButtonMore" : "viewButtonLess",
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
        {
          type: "groupHeader",
          groupTitle: "Key Performance indicators",
        },
        {
          id: "projectlevel",
          title: "Project-level",
          type: "item",
          icon: <Icon.List size={20} />,
          navLink: "/projectlevel",
        },
        // {
        //   id: "viewallprojects",
        //   title: "Org-level",
        //   type: "item",
        //   icon: <Icon.List size={20} />,
        //   navLink: "/data-list/view-all-projects",
        // },
      ];
      this.setState({
        navigationConfig,
        viewMore: false,
        viewLess: false,
      });
    }
  }

  viewMoreProjects() {
    this.setState({
      viewMore: true,
    });
  }

  viewLessProjects() {
    this.setState({
      viewLess: true,
    });
  }

  render() {
    // Loop over sidebar items
    // eslint-disable-next-line

    const menuItems =
      this.state.navigationConfig !== undefined
        ? this.state.navigationConfig.map((item) => {
            const CustomAnchorTag = item.type === "external-link" ? `a` : Link;
            // checks if item has groupheader
            if (item.type === "groupHeader") {
              return (
                <li
                  className="navigation-header"
                  key={`group-header-${item.groupTitle}`}
                >
                  <span>{item.groupTitle}</span>
                </li>
              );
            }

            let renderItem = (
              <li
                style={{
                  display:
                    (item.type === "viewButtonMore" ||
                      item.type === "viewButtonLess") &&
                    this.state.projectList.length <= 5
                      ? "none"
                      : "block",
                }}
                className={classnames("nav-item", {
                  "has-sub": item.type === "collapse",
                  open: this.state.activeGroups.includes(item.id),
                  "sidebar-group-active":
                    this.state.currentActiveGroup.includes(item.id),
                  hover: this.props.hoverIndex === item.id,
                  active:
                    (this.props.activeItemState === item.navLink &&
                      item.type === "item") ||
                    (item.parentOf &&
                      item.parentOf.includes(this.props.activeItemState)),
                  disabled: item.disabled,
                })}
                key={item.id}
                onClick={(e) => {
                  e.stopPropagation();
                  if (item.type === "item") {
                    this.props.handleActiveItem(item.navLink);
                    this.handleGroupClick(item.id, null, item.type);
                    if (
                      this.props.deviceWidth <= 1200 &&
                      item.type === "item"
                    ) {
                      this.props.toggleMenu();
                    }
                  } else {
                    this.handleGroupClick(item.id, null, item.type);
                  }
                }}
              >
                <CustomAnchorTag
                  to={
                    item.filterBase
                      ? item.filterBase
                      : item.navLink && item.type === "item"
                      ? item.navLink
                      : item.type === "viewButtonMore" ||
                        item.type === "viewButtonLess" ||
                        item.type === "noProjects"
                      ? item.navLink
                      : ""
                  }
                  href={item.type === "external-link" ? item.navLink : ""}
                  className={`d-flex ${
                    item.badgeText
                      ? "justify-content-between"
                      : "justify-content-start"
                  }`}
                  onMouseEnter={() => {
                    this.props.handleSidebarMouseEnter(item.id);
                  }}
                  onMouseLeave={() => {
                    this.props.handleSidebarMouseEnter(item.id);
                  }}
                  key={item.id}
                  onClick={(e) => {
                    return item.type === "collapse"
                      ? e.preventDefault()
                      : item.type === "viewButtonMore"
                      ? this.viewMoreProjects()
                      : item.type == "viewButtonLess"
                      ? this.viewLessProjects()
                      : "";
                  }}
                  target={item.newTab ? "_blank" : undefined}
                >
                  <div className="menu-text">
                    {item.icon}
                    <span className="menu-item menu-title">{item.title}</span>
                  </div>

                  {item.badge ? (
                    <div className="menu-badge">
                      <Badge color={item.badge} className="mr-1" pill>
                        {item.badgeText}
                      </Badge>
                    </div>
                  ) : (
                    ""
                  )}
                  {item.type === "collapse" ? (
                    <ChevronRight className="menu-toggle-icon" size={13} />
                  ) : (
                    ""
                  )}
                  {item.type === "viewButtonMore" ? (
                    <ChevronDown className="menu-toggle-icon" size={13} />
                  ) : item.type === "viewButtonLess" ? (
                    <ChevronUp className="menu-toggle-icon" size={13} />
                  ) : (
                    ""
                  )}
                </CustomAnchorTag>
                {item.type === "collapse" ? (
                  <SideMenuGroup
                    group={item}
                    handleGroupClick={this.handleGroupClick}
                    activeGroup={this.state.activeGroups}
                    handleActiveItem={this.props.handleActiveItem}
                    activeItemState={this.props.activeItemState}
                    handleSidebarMouseEnter={this.props.handleSidebarMouseEnter}
                    activePath={this.props.activePath}
                    hoverIndex={this.props.hoverIndex}
                    initRender={this.initRender}
                    parentArr={this.parentArr}
                    triggerActive={undefined}
                    currentActiveGroup={this.state.currentActiveGroup}
                    permission={this.props.permission}
                    currentUser={this.props.currentUser}
                    redirectUnauthorized={this.redirectUnauthorized}
                    collapsedMenuPaths={this.props.collapsedMenuPaths}
                    toggleMenu={this.props.toggleMenu}
                    deviceWidth={this.props.deviceWidth}
                  />
                ) : (
                  ""
                )}
              </li>
            );

            if (
              item.navLink &&
              item.collapsed !== undefined &&
              item.collapsed === true
            ) {
              this.collapsedPath = item.navLink;
              this.props.collapsedMenuPaths(item.navLink);
            }

            if (
              item.type === "collapse" ||
              item.type === "external-link" ||
              (item.type === "item" &&
                item.permissions &&
                item.permissions.includes(this.props.currentUser)) ||
              item.permissions === undefined
            ) {
              return renderItem;
            } else if (
              item.type === "item" &&
              item.navLink === this.props.activePath &&
              !item.permissions.includes(this.props.currentUser)
            ) {
              return this.redirectUnauthorized();
            }
          })
        : [];
    return <React.Fragment>{menuItems}</React.Fragment>;
  }
}

const mapStateToProps = (state) => {
  return {
    projectList: state.projectList.projectList,
  };
};

export default connect(mapStateToProps, {
  fetchAllProjects,
  fetchAllProjectsClear,
})(SideMenuContent);
