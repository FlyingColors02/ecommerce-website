import React from "react";
import PaySeller from "../Payment/paySeller";
import RefundUser from "../Payment/refundUser";
import AddCategory from "../Category/addCategory";
import { Route, Switch } from "react-router-dom";
const AdminHomePage = ()=>{
  return(
    <div>
      helloss
      <Switch>
  <Route path="/add/category/_a" component={AddCategory}/>
  <Route path="/refund/user" component={RefundUser}/>
  <Route path="/pay/Seller" component={PaySeller}/>
</Switch>
    </div>


);

  }

 export default AdminHomePage;
 
