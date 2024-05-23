document.addEventListener('DOMContentLoaded', () => {
    // Initialize the Auth0 object
    const auth0Client = new auth0.WebAuth({
        domain: 'dev-kjc8meavg5owvmuc.us.auth0.com',  // Auth0 domain
        clientID: 'VTvqCi5OfPwOhwTU1sPvmOKFmkTloD3V',  // Auth0 client ID
        redirectUri: window.location.origin + '/callback',
        responseType: 'token id_token',
        scope: 'openid profile email'
    });

    // Get the login and logout buttons
    const loginButton = document.getElementById('login');
    const logoutButton = document.getElementById('logout');

    // Add event listener for the login button
    loginButton.addEventListener('click', () => {
        console.log('Login button clicked');
        auth0Client.authorize();
    });

    // Add event listener for the logout button
    logoutButton.addEventListener('click', () => {
        console.log('Logout button clicked');
        auth0Client.logout({
            returnTo: window.location.origin
        });
    });

    // Handle authentication
    const handleAuthentication = () => {
        auth0Client.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                window.location.hash = '';
                console.log('Authentication successful', authResult);
                auth0Client.client.userInfo(authResult.accessToken, (err, user) => {
                    if (user) {
                        console.log('User info retrieved', user);
                        document.getElementById('app').innerHTML = `
                            <h1>Welcome ${user.name}</h1>
                            <button id="logout">Log Out</button>
                        `;
                        document.getElementById('logout').addEventListener('click', () => {
                            auth0Client.logout({
                                returnTo: window.location.origin
                            });
                        });
                    } else if (err) {
                        console.error('Error retrieving user info', err);
                    }
                });
            } else if (err) {
                console.error('Error parsing hash', err);
            }
        });
    };

    // Check if the user is returning from the Auth0 login page
    if (window.location.hash.includes('access_token')) {
        handleAuthentication();
    }
});
