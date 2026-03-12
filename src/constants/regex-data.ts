export const regexObject = {
  //generic
  alphanumeric: /^[a-zA-Z0-9\s]+$/,
  text: /^[a-zA-Z\s]+$/,
  int: /^[0-9]+$/,
  number: /^[0-9.]+$/,
  any: /^.*$/,

  //custom
  username: /^[a-zA-Z0-9\s]+$/,
  email: /^[a-zA-Z0-9@.\s]+$/,
  password: /^.*$/,
  mobile_no: /^[+0-9]+$/,
};

export const regexMod = {
  password: [
    {
      name: "uppercase letters",
      validation: /[A-Z]/,
    },
    {
      name: "lowercase letters",
      validation: /[a-z]/,
    },
    {
      name: "numbers",
      validation: /[0-9]/,
    },
    {
      name: "special characters",
      validation: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
    },
  ],
};
