const _config = {
  API_URL: import.meta.env.VITE_API_URL,
};
const config = {
  get: (key) => {
    const value = _config[key];
    if (!value)
      throw Error(
        `Could not found the variable ${key}, please make sure to pass an env variable!`,
      );

    return value;
  },
};

export default config;
