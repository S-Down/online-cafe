module.exports = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  async headers() {
    return [
      {
        // matching all api routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow_Credentials", value: "true" },
          { key: "Access-Control-Allow_Origin", value: "*" },
          {
            key: "Access-Control-Allow_Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow_Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Data, X-Api-Version",
          },
        ],
      },
    ];
  },
  axios: {
    BASE_URL: "http://localhost:3000",
  },
  publicRuntimeConfig: {
    axios: {
      BASE_URL: process.env.BASE_URL,
    },
  },
};
