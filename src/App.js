import React from "react";
import Navigation from "./components/User/Navbar/navbar";
import { Route, Switch, withRouter, BrowserRouter } from "react-router-dom";
import Login from "./components/User/Authentication/login";
import Registration from "./components/User/Authentication/registration";
import Home from "./components/User/Home/home";
import Products from "./components/User/Products/products";
import ProductDetails from "./components/User/Products/productDetails";
import Cart from "./components/User/Cart/Cart";
import ConditionOfUse from "./components/User/ConditionOfUse/conditionOfUse";
import PrivacyPolicy from "./components/User/ConditionOfUse/privacyPolicy";
import PrivateRoute from "./Shared/PrivateRoute/userPrivateRoute";
import SendMail from "./components/User/Authentication/sendMail";
import ResetPassword from "./components/User/Authentication/resetPassword.jsx";
import mailSendMessage from "./components/User/Authentication/mailSendMessage";
import SearchedProduct from "./components/User/Products/searchedProduct";
import SellProductLinkFooter from "./components/User/Footer/sellProduct";
import SellMainPage from "./components/Seller/Home/sellerMainPage";
import RegistrationSell from "./components/Seller/Authentication/registrationSell";
import SellNavigation from "./components/Seller/Navbar/sellNavbar.jsx";
import SellLogin from "./components/Seller/Authentication/sellLogin";
import SellerPrivateRoute from "./Shared/PrivateRoute/sellerPrivateRoute";
import SellerPickUpAddress from "./components/Seller/Authentication/pickUpAddress";
import SellerBankDetails from "./components/Seller/Authentication/bankDetails"
import SellerProductContribution from "./components/Seller/Home/productContribution";
import AddProduct from "./components/Seller/Product/addProduct";
import UpdateProduct from "./components/Seller/Product/updateProduct";
import PlaceOrder from "./components/User/Order/placeOrder";
import ViewUserOrder from "./components/User/Order/ViewUserOrder";
import ViewSellerOrders from "./components/Seller/Order/viewSellerOrders";
import ViewShippedOrders from "./components/Seller/Order/viewShippedOrders";
import UpdateSellerAccount from "./components/Seller/Authentication/updateAccountDetails.jsx"
import UpdateUserAccount from "./components/User/Authentication/updateAccountDetails.jsx";
import AdminRegistration from "./components/Admin/Authenticate/registration.jsx";
import AdminLogin from "./components/Admin/Authenticate/login.jsx";
import CategoryNavbar from "./components/User/CategoryNavbar/categoryNavbar";
import AddCategory from "./components/Admin/Category/addCategory";
import PaySeller from "./components/Admin/Payment/paySeller";
import RefundUser from "./components/Admin/Payment/refundUser";
import ProductByCategory from "./components/User/Products/productByCategory";
import ProductBySubCategory from "./components/User/Products/productBySubCategory";
import DeleteUserAccount from "./components/User/Authentication/deleteAccount";
import AdminPrivateRoute from "./Shared/PrivateRoute/adminPrivateRoute";
import internalServerError from "./components/ErrorPage/internalServalError";
import AdminNavbar from "./components/Admin/Navbar/navbar.jsx";

const Main = withRouter(({ location }) => {

    if (
        location.pathname === "/" ||
        location.pathname === "/home"

    ) {
        return (
            <div>
                <Navigation />
                <CategoryNavbar/>
                <Route path="/" exact component={Home} />
                <Route path="/home" component={Home} />


                <SellProductLinkFooter />
            </div>
        )
    }

    else if (
        location.pathname === "/login" || location.pathname === "/registration" ||
        location.pathname === "/seller/registration" || location.pathname === "/seller/login"
        || location.pathname === "/mailsend" || location.pathname === "/seller/PickUpAddress"
        || location.pathname === "/seller/BankDetails" || location.pathname === "/admin/registration"
        ||location.pathname === "/admin/login"
        ||location.pathname==="/delete/account/_s"|| location.pathname==="/error"
    ) {
        return (
            <div>
                <Route path="/login" component={Login} />
                <Route path="/registration" component={Registration} />
                <Route path="/seller/registration" component={RegistrationSell} />
                <Route path="/seller/login" component={SellLogin} />
                <Route path="/mailsend" component={mailSendMessage} />
                <Route path="/seller/PickUpAddress" component={SellerPickUpAddress} />
                <Route path="/seller/BankDetails" component={SellerBankDetails} />
                <Route path="/admin/registration" component={AdminRegistration}/>
                <Route path="/admin/login" component={AdminLogin}/>
                
                <PrivateRoute path="/delete/account/_u" component={DeleteUserAccount}/>
                <SellerPrivateRoute path="/delete/account/_s" component={DeleteUserAccount}/>
                <Route path="/error" component={internalServerError}/>
            </div>

        )
    }

    else if(
        location.pathname === "/add/category/_a" 
        || location.pathname === "/pay/Seller" || location.pathname === "/refund/user"||
         location.pathname === "/delete/account/_u"
    ){
        return(
            <div>
                <AdminNavbar/>

<AdminPrivateRoute path="/add/category/_a" component={AddCategory}/>
                <AdminPrivateRoute path="/pay/Seller" component={PaySeller}/>
                <AdminPrivateRoute path="/refund/user" component={RefundUser}/>
                
            </div>

        )

    }

    else if (
        location.pathname === "/forgot password" || location.pathname === "/order/u"
        || location.pathname === "/cart" || location.pathname === "/amYflip conditions"
        || location.pathname === "/privacy policy"|| location.pathname === "/account/details/u"
    ) {
        return (
            <div>
                <Navigation />
                <PrivateRoute path="/cart" component={Cart} />
                <PrivateRoute path="/order/u" component={ViewUserOrder} />
                <Route path="/amYflip conditions" component={ConditionOfUse} />
                <Route path="/privacy policy" component={PrivacyPolicy} />
                <Route path="/forgot password" component={SendMail} />
                <PrivateRoute path="/account/details/u" component={UpdateUserAccount} />
            </div>
        )
    }


    else if (location.pathname === "/seller product/main page" || location.pathname === "/orders/s"
        || location.pathname === "/seller/addproduct" ||  location.pathname === "/s/account/details" 
        || location.pathname === "/shipped/orders/s") {
        return (
            <div>
                <SellNavigation />
                <Route path="/seller product/main page" component={SellMainPage} />
                <SellerPrivateRoute path="/orders/s" component={ViewSellerOrders} />
                <SellerPrivateRoute path="/shipped/orders/s" component={ViewShippedOrders} />
                <SellerPrivateRoute path="/seller/addproduct" component={AddProduct} />
                <SellerPrivateRoute path="/s/account/details" component={UpdateSellerAccount} />
               
            </div>
        )
    }


    else if (location.pathname.split("/", 15).filter(item => item.includes("searched product")).length > 0) {
        console.log(location.pathname.split("/", 10).filter(item => item.includes("searched product")))
        return (
            <div >
                <Navigation />
                <CategoryNavbar/>
                <Route path="/searched product/data/data=:data/pageNo/pageNo=:pageNo" component={SearchedProduct} />
                {/* <SellProductLinkFooter /> */}
            </div>
        )
    }
    else if (location.pathname.split("/", 15).filter(item => item === "productdetails").length > 0) {
        console.log(location.pathname.split("/", 10).filter(item => item === "productdetails"))
        return (
            <div>
                <Navigation />

                <Route path="/productdetails/:id" component={ProductDetails} />

            </div>
        )
    }
    else if (location.pathname.split("/", 15).filter(item => item.includes("productsByCategory" && "category")).length > 0) {
        return (
            <div>
                <Navigation/>
                <CategoryNavbar/>
                <Route path="/productsByCategory/category/:category/pageNo/pageNo=:pageNo" component={ProductByCategory} />
                {/* <SellProductLinkFooter/> */}
            </div>
        )
    }
    else if (location.pathname.split("/", 15).filter(item => item.includes("productsBySubCategory" && "subCategory")).length > 0) {
        return (
            <div>
                <Navigation/>
                <CategoryNavbar/>
                <Route path="/productsBySubCategory/subCategory/:subCategory/pageNo/pageNo=:pageNo" component={ProductBySubCategory} />
                {/* <SellProductLinkFooter/> */}
            </div>
        )
    }
    else if (location.pathname.split("/", 15).filter(item => item.includes("product" && "update")).length > 0) {
        console.log(location.pathname.split("/", 10).filter(item => item.includes("product" && "update")))
        return (
            <div >
                <SellNavigation />
                <Route path="/product/update/:id" component={UpdateProduct} />
            </div>
        )
    } else if (location.pathname.split("/", 15).filter(item => item.includes("seller" && "ProductContribution")).length > 0) {
        console.log(location.pathname.split("/", 10).filter(item => item.includes("seller" && "ProductContribution")))
        return (
            <div >
                <SellNavigation />
                <Route path="/seller/ProductContribution/pageNo=:pageNo" component={SellerProductContribution} />
            </div>
        )
    }
    else if (location.pathname.split("/", 15).filter(item => item.includes("products" )).length > 0) {
        console.log(location.pathname.split("/", 10).filter(item => item.includes("products" )))
        return (
            <div >
                <Navigation />
                <CategoryNavbar/>
                <Route path="/products/pageNo/pageNo=:pageNo" component={Products} />
                {/* <SellProductLinkFooter /> */}
            </div>
        )
    }
    else if (location.pathname.split("/", 15).filter(item => item.includes("Place Order")).length > 0) {
        console.log(location.pathname.split("/", 10).filter(item => item.includes("Place Order")))
        return (
            <div >
                <Navigation />
                <PrivateRoute path="/Place Order/:id" component={PlaceOrder} />
            </div>
        )
    }
    else if (location.pathname.split("/", 15).filter(item => item === "reset password").length > 0) {
        return (
            <div>
                <Route path="/reset password/:token" component={ResetPassword} />
            </div>
        )
    }
    



})

const App = () => {
    return (


        <BrowserRouter>

            <Main />

        </BrowserRouter>
    )

}
export default App;