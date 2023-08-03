//import logo from './logo.svg';
import { useState } from 'react';
import SideBar from '../components/sidebar/sidebar';
import NavBar from '../components/navbar/navbar';
import Main from '../components/main/main'
import '../style/DashboardScreen.css';

const DashboardScreen = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const openSideBar = () => {
    setSideBarOpen(true);
  };
  const closeSideBar = () => {
    setSideBarOpen(false);
  };
  return (
    <div className="container_">
      <NavBar sideBarOpen = {sideBarOpen} openSideBar = {openSideBar}/>
      <Main/>
      <SideBar sideBarOpen = {sideBarOpen} closeSideBar = {closeSideBar}/>
    </div>
  );
}

export default DashboardScreen;
