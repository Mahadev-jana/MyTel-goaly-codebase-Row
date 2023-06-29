export const isValidEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return Boolean(re.test(String(email).toLowerCase()));
}

export const isEmpty = (param) => {
    return Boolean(param.trim() === '');
}

export const isValidMobileNo = (number) => {
    const re = /([0-9])+/
    return Boolean(re.test(String(number).toLowerCase()));
}

export const isValidImage = (image) => {
    const _validFileExtensions = ["jpg", "jpeg", "bmp", "gif", "png"];
    const fileName = image.name;
    let extension = fileName.split('.');
    extension = extension[extension.length - 1];
    return _validFileExtensions.indexOf(extension.toLowerCase()) === -1 ? false : true;
}