import React from 'react'

function getUser() {
    return Promise.resolve({id: '1', name: 'Admin'});
}

const App = () => {
    const [user, setUser] = React.useState(null);

    const loadUser = async () => {
        const user = await getUser();
        setUser(user);
    };

    React.useEffect(() => {
        loadUser()
    }, []);

    if (user) {
        return (
            <div>
                <p>Signed in as {user.name}</p>
                <button
                    id="button-logout"
                    onClick={() => setUser(null)}
                >
                    Logout
                </button>
            </div>)
    }

    return <div>
        <button
            id="button-login"
            onClick={loadUser}
        >
            Login
        </button>
    </div>;
}

export default App;
