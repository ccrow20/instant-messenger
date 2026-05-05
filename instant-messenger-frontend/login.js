const config = {
    region: "us-east-1",
    userPoolId: "us-east-1_1SmyHDmmx",
    userPoolClientId: "clientID",
    wsUrl: "websocketURL"
};

AWS.config.region = config.region;

const poolData = {
    UserPoolId: config.userPoolId,
    ClientId: config.userPoolClientId
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

function loginUser() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const authData = {
        Username: email,
        Password: password
    };

    const authDetails = new AmazonCognitoIdentity.AuthenticationDetails(authData);

    const userData = {
        Username: email,
        Pool: userPool
    };

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.authenticateUser(authDetails, {
        onSuccess: session => {
            const idToken = session.getIdToken().getJwtToken();
            localStorage.setItem("idToken", idToken);
            window.location.href = "chat.html";
        },
        onFailure: err => {
            alert(err.message || JSON.stringify(err));
        }
    });
}
