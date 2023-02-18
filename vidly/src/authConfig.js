export const msalConfig = {
    auth: {
        clientId: "8a121b1a-baae-4a3e-9776-a38c6c86c861",
        authority: "https://login.microsoftonline.com/common",
        redirectUri: "http://localhost:3000",
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
    },
};

export const loginRequest = {
    scopes: ["User.read"],
};
