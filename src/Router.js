import React, { Suspense, lazy } from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { history } from "./history";
import { connect } from "react-redux";
import Spinner from "./components/@vuexy/spinner/Loading-spinner";
import { ContextLayout } from "./utility/context/Layout";
const listView = lazy(() => import("./views/ui-elements/data-list/ListView"));
const managePeerView = lazy(() => import("./views/pages/ManagePeer"));
const ViewAllSprintView = lazy(() => import("./views/pages/ViewAllSprint"));
const ViewAllTaskView = lazy(() => import("./views/pages/ViewAllTask"));
const ViewAllProjectView = lazy(() => import("./views/pages/ViewAllProject"));
const ProjectOverView = lazy(() => import("./views/pages/OverView"));
const AbsenceSubmitted = lazy(() =>
  import("./views/pages/AbsenceEmailConfirmation")
);
const Preview = lazy(() => import("./views/pages/Preview"));
const ForgotPassword = lazy(() =>
  import("./views/pages/authentication/login/ForgotPassword")
);
const ResetPassword = lazy(() =>
  import("./views/pages/authentication/login/ResetPassword")
);
const ProjectLevel = lazy(() => import("./views/pages/kpi/project-level"));

const tvApp = lazy(() => import("./views/pages/darkversion/tvApp"));

const projectLevelKpi = lazy(() =>
  import("./views/pages/project-level-kpi/projectLevelKpi")
);

const ThoughtLeadership = lazy(() =>
  import("./views/pages/kpi/ThoughtLeadership")
);
const Revenue = lazy(() => import("./views/pages/kpi/Revenue"));
const Profitability = lazy(() => import("./views/pages/kpi/Profitability"));
const AboutCompany = lazy(() => import("./views/pages/kpi/AboutCompany"));
const cNPS = lazy(() => import("./views/pages/kpi/cNPS"));
const EnpsChart = lazy(() => import("./views/pages/kpi/EnpsChart"));

const AllroundFeedback = lazy(() => import("./views/pages/Allroundfeedback"));

// Route-based code splitting

const DashBoard = lazy(() => import("./views/pages/Dashboard"));

const login = lazy(() => import("./views/pages/authentication/login/Login"));

// Set Layout and Component Using App Route
const RouteConfig = ({
  component: Component,
  fullLayout,
  permission,
  user,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      return (
        <ContextLayout.Consumer>
          {(context) => {
            let LayoutTag =
              fullLayout === true
                ? context.fullLayout
                : context.state.activeLayout === "horizontal"
                ? context.horizontalLayout
                : context.VerticalLayout;
            return (
              <LayoutTag {...props}>
                <Suspense fallback={<Spinner />}>
                  {localStorage.getItem("user") !== null ? (
                    <Component {...props} />
                  ) : (
                    history.push("/" + props.location.search)
                  )}
                </Suspense>
              </LayoutTag>
            );
          }}
        </ContextLayout.Consumer>
      );
    }}
  />
);
const mapStateToProps = (state) => {
  return {
    user: state.auth.login.userRole,
  };
};

const AppRoute = connect(mapStateToProps)(RouteConfig);

class AppRouter extends React.Component {
  render() {
    return (
      // Set the directory path if you are deploying in sub-folder
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={login} fullLayout />
          <Route path="/forgot-password" component={ForgotPassword} />
          <AppRoute path="/reset-password" component={ResetPassword} />
          <AppRoute path="/data-list/list-view" component={listView} />
          <AppRoute
            path="/data-list/manage-peer-view"
            component={managePeerView}
          />
          <AppRoute
            path="/data-list/view-all-sprints/:id"
            component={ViewAllSprintView}
          />
          <AppRoute
            path="/data-list/view-all-tasks/:id"
            component={ViewAllTaskView}
          />
          <AppRoute
            path="/data-list/view-all-projects"
            component={ViewAllProjectView}
          />
          <AppRoute
            path="/view-components/overview/:projectId"
            component={ProjectOverView}
          />
          <AppRoute path="/projectlevel" component={ProjectLevel} />
          <AppRoute path="/projectlevelkpi" component={projectLevelKpi} />
          <AppRoute path="/tvapp" component={tvApp} />
          <AppRoute path="/dashboard" component={DashBoard} />
          <AppRoute
            path="/get-overall-peer-review"
            component={AllroundFeedback}
          />
          <AppRoute path="/preview" component={Preview} />

          <AppRoute path="/pages/login" component={login} fullLayout />

          <AppRoute path="/thoughtLeadership" component={ThoughtLeadership} />
          <AppRoute path="/revenue" component={Revenue} />
          <AppRoute path="/profitability" component={Profitability} />
          <AppRoute path="/aboutCompany" component={AboutCompany} />
          {/* aboutCompany means ThoughtLeadership */}
          <AppRoute path="/cNPS" component={cNPS} />
          <AppRoute path="/enpsChart" component={EnpsChart} />

          <AppRoute path="/consensus" component={AbsenceSubmitted} fullLayout />
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;
