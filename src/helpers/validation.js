

export const regexvalidate = (str, length = 0) => {

    const regex =new RegExp(`^([A-Za-z0-9]{${length},})$`);

    return regex.test(str)

}

export const regexValidateNumber = (str) => {

    const regex = new RegExp(`^[0-9]*$`);
    return regex.test(str)

}