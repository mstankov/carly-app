export const isObjectEmpty = (obj: {}) => {
    if (Object.keys(obj).length > 0) {
        return false;
    }

    return true;
}

export const storeUserCredentials = ({ email, password }) => {
    const user = localStorage.getItem('user_credentials');

    if (!user || isObjectEmpty(user)) {
        localStorage.setItem('user_credentials', JSON.stringify({ email: email, password: password }));
    };
}