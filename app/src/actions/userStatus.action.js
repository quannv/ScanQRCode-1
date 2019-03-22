export const USER_STATUS = {
    LOADING_STATUS : 'LOADING_STATUS',
    AUTHORIZED : 'AUTHORIZED'
}

export const setUserStatus = (status) => {
    
    return {
        type : status
    }
}
