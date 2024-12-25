// import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserSidebarNavigation from '../../navigation/user-sidebar-navigation/user-sidebar-navigation.component'; 
//  '../../navigation/user-sidebar-navigation/user-sidebar-navigation.component.jsx'; // './user-sidebar.component.jsx';
import Orders from '../../components/user/orders/orders.component';
import EditUser from '../../components/user/edit-user/edit-user.component';


const UserPage = ({ language }) => {
  return (
    <>

    <div className="col-sm-2 sidenav">
            {/* Stranska vrstica */}
            <UserSidebarNavigation language={language} />

    </div>

    
    <div className="col-sm-8 text-left product-list"> 
    UserPage
        <Routes>
            <Route path="/user/edit" element={<EditUser language={language} />} />
            <Route path="/user/orders" element={<Orders language={language} />} />
            <Route path="/user/orders" element={<Orders language={language} />} />
          </Routes>
        </div>


    
    
    </>
  );
};

export default UserPage;

/*

*/

//Loading module from “http://localhost:5173/src/pages/user-pages/user.component.jsx?t=1734952791654” was blocked because of a disallowed MIME type (“”).