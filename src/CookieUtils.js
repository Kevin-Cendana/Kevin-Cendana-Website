//--------------------------------------------------------------------------------------//
//                                    CookieUtils.js                                    //
//--------------------------------------------------------------------------------------//
                    /*This file is used to set and get cookies*/ 

// get cookie by name
const getCookie = (name) => {
    const cookieName = name + '=';                  // define prefix 
    const cookieArray = document.cookie.split(';'); // split cookies

    // loop through all cookies
    for (let i = 0; i < cookieArray.length; i++) {
        // remove whitespace, and check if cookie name matches prefix
        let cookie = cookieArray[i].trim();                                              
        if (cookie.indexOf(cookieName) === 0) return cookie.substring(cookieName.length); 
    }
    // return empty if not found
    return ''; 
};

// set cookie with name, value, and expiration
const setCookie = (name, value, days) => {
    const date = new Date();                                    // get current date
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);  // set expiration time
    const expires = 'expires=' + date.toUTCString();            // format expiration
    document.cookie = name + '=' + value + ';' + expires + ';path=/'; // set cookie
};

export { getCookie, setCookie };
