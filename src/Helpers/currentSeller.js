export const authSeller = () => {
    let user = JSON.parse(localStorage.getItem("seller"));
    if(user){
        return {"x-authseller-token" : user}
    }
    else{
        return null;
    }
} 