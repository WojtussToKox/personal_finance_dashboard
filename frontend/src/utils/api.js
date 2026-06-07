export const fetchWithAuth = async (url, options ={}) => {
    let accessToken = localStorage.getItem('access');

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    }

    if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
    }

    let response = await fetch(url, {...options, headers });

    if(response.status === 401) {
        console.log("Token Wygasł! ");

        const refreshToken = localStorage.getItem('refresh')
        
        if (refreshToken) {
            try {
                const refreshResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/token/refresh/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ refresh: refreshToken }) 
                });

                if (refreshResponse.ok) {
                    const data = await refreshResponse.json();
                    
                    accessToken = data.access;

                    localStorage.setItem('access', data.accessToken);

                    headers['Authorization'] = `Bearer ${accessToken}`

                    response = await fetch(url, { ...options, headers });
                } else {
                    throw new Error("Refresh token expired");
                }
            } catch (error) {
                console.error("Sesja wygałsa -> ", error);
                localStorage.removeItem('access');
                localStorage.removeItem('refresh');

                window.location.href = '/login';
            }
        } else {
            window.location.href = '/login';
        }
    }

    return response;

}