export const authAdmin = () => {
    let user = JSON.parse(localStorage.getItem("admin"));
    if(user){
        return {"x-authadmin-token" : user}
    }
    else{
        return null;
    }
} 