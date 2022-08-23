import { combineReducers } from "redux";
import customizer from "./customizer/";
import auth from "./auth/";
import navbar from "./navbar/Index";
import dataList from "./data-list";
import ProjectListReducer from "./projects";
import PeerListReducer from "./peers";
import sprintListReducer from "./sprint";
import taskListReducer from "./task";
import Login from "./login";
import fetchProjectListReducer from "./sidebar";
import projectOverViewReducer from "./overview";
import ReadytoonboardListReducer from "./dashboard";
import KpiDataReducer from "./kpi";

const rootReducer = combineReducers({
  customizer: customizer,
  auth: auth,
  navbar: navbar,
  dataList: dataList,
  projects: ProjectListReducer,
  peers: PeerListReducer,
  kpidata: KpiDataReducer,
  sprints: sprintListReducer,
  tasks: taskListReducer,
  logindata: Login,
  projectList: fetchProjectListReducer,
  projectOverView: projectOverViewReducer,
  readytoOnboard: ReadytoonboardListReducer,
});

export default rootReducer;
