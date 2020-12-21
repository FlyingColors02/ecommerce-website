import { combineReducers} from "redux";
import { DeleteUserAccountReducer, LoginReducer, RegistrationReducer } from "./reducers/User/Authentication/authenticateReducer";
import { allProductsReducer, ProductsByCategoryReducer, ProductsBySubCategoryReducer } from "./reducers/User/Products/productsReducer";
import productDetailsReducer from "./reducers/User/Products/productDetailsReducer";
import storage from "redux-persist/lib/storage";
import CartReducer from "./reducers/User/Cart/CartDataReducer";
import addToCartReducer from "./reducers/User/Cart/addToCartDataReducer";
import { LoggedInUserReducer } from "./reducers/User/Authentication/LoggedInUser";
import { SendMailReducer, ResetPasswordReducer } from "./reducers/User/Authentication/resetPasswordReducer";
import { latestProductsReducer } from "./reducers/User/Products/latestProductsReducer";
import { DeleteSellerAccountReducer, SellLoginReducer, SellRegistrationReducer } from "./reducers/Seller/Authentication/authenticateReducer";
import { LoggedInSellerReducer } from "./reducers/Seller/Authentication/LoggedInUser";
import { SellSendMailReducer, SellResetPasswordReducer } from "./reducers/Seller/Authentication/resetPasswordReducer";
import { FetchSellerProductsReducer, AddProductReducer, UpdateProductReducer } from "./reducers/Seller/Product/productReducer";
import { ProductPaginationReducer, PaginationReducer } from "./reducers/User/Pagination/paginationReducer";
import {PlaceOrderReducer} from "./reducers/User/Order/orderReducer";
import { ViewSellerOrderReducer, ViewShippedOrderReducer } from "./reducers/Seller/Order/orderReducer";
import { AdminLoginReducer, AdminRegistrationReducer } from "./reducers/Admin/Authentication/authenticateReducer";
import { LoggedInAdminReducer} from "./reducers/Admin/Authentication/LoggedInAdmin";
import { AddCategoryReducer, FetchCategoryReducer, FetchMainCategoryReducer, FetchSubCategoryReducer } from "./reducers/Admin/Category/categoryReducer";
import { FetchAllCancelledOrdersReducer, FetchAllShippedOrdersReducer } from "./reducers/Admin/Payment/payment";

const reducers = combineReducers({
    login: LoginReducer, 
    register: RegistrationReducer,
    products: allProductsReducer, 
    productDetails: productDetailsReducer, 
    Cart: CartReducer,
    addToCartData : addToCartReducer,
    loggedInUser: LoggedInUserReducer,
    sendmail: SendMailReducer,
    resetpassword: ResetPasswordReducer,
    latestProducts: latestProductsReducer,
    sellerLogin : SellLoginReducer,
    sellerRegister : SellRegistrationReducer,
    loggedInSeller : LoggedInSellerReducer,
    sellerSendMail : SellSendMailReducer,
    sellerProducts : FetchSellerProductsReducer,
    sellerResetPassword : SellResetPasswordReducer,
    addProduct: AddProductReducer,
    mainCategory: FetchMainCategoryReducer,
    updateProduct: UpdateProductReducer,
    productPagination: ProductPaginationReducer,
    pagination: PaginationReducer,
    placeOrder: PlaceOrderReducer,
    sellerOrder: ViewSellerOrderReducer,
    shippedOrder: ViewShippedOrderReducer,
    adminLogin: AdminLoginReducer,
    adminRegister: AdminRegistrationReducer,
    loggedInAdmin: LoggedInAdminReducer,
    category: FetchCategoryReducer,
    subCategory: FetchSubCategoryReducer,
    cancelledOrders:FetchAllCancelledOrdersReducer,
    allShippedOrders: FetchAllShippedOrdersReducer,
    productsByCategory: ProductsByCategoryReducer,
    productsBySubCategory: ProductsBySubCategoryReducer,
    deleteUserAccount: DeleteUserAccountReducer,
    deleteSellerAccount: DeleteSellerAccountReducer,
    addCategory: AddCategoryReducer
});

export const persistConfig = {
    key : "root",
    storage,
    whitelist: ['Cart','sellerRegister','sellerLogin', "loggedInUser","mainCategory"]
}
export default reducers;