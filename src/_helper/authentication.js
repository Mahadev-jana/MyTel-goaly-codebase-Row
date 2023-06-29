export const isAuthenticate = () => {
    return Boolean(localStorage.getItem('JWT'));
}

export const getUserDetails = () => {
    return JSON.parse(localStorage.getItem('userDetails'));
}

export const setUserDetails = (userDetails) => {
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
}
export const setJWT = (userJWT) =>{
    localStorage.setItem('JWT',userJWT);
}

export const gmtToLocalTime = datetime => {
    const time = datetime+' GMT';
    var myDate = new Date(time);
    myDate.setHours(myDate.getHours() - 1); 
    console.table({
        time,
        local: myDate.toLocaleString(),
        data: new Date().toString()
    });
    return myDate.toLocaleString();
}