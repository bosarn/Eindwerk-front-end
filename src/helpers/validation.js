

export const regexvalidate = (str, length = 0) => {

    const regex =new RegExp(`^([A-Za-z0-9]{${length},})$`);

    return regex.test(str)

}