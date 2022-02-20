import axios from 'axios';
const API_URL = "http://localhost:5000/api/user";

export default {
    isAuthenticated() {
        const token = localStorage.getItem('userTicket')
        if (token) {
            return true
        } else {
            return false
        }
    },

    getGuestUser() {
        return { name: "Guest 123", userId: "guest123", email: "coolboy69@gg.com" }
    },

    authenticate(cb) {
        this.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },

    signout(cb) {
        this.isAuthenticated = false;
        setTimeout(cb, 100);
    },

    loginWithGoogle(res) {
        var data = {
            name: res.profileObj.name,
            email: res.profileObj.email,
            image: res.profileObj.imageUrl
        }

        return axios
            .post(`${API_URL}/login`, data)
            .then(response => {
                console.log(response.data);
                if (response.data.accessToken) {
                    localStorage.setItem("userTicket", JSON.stringify(response.data.accessToken));
                }
                return response.data;
            });
    },

    loginAsGuest() {
        var userData = {
            name: "Cool Guest",
            id: "y2jsdqakq9rqyvtd4gf6g",
            email: "coolboy69@gg.com"
        }

        return axios
            .post(`${API_URL}/login`, userData)
            .then(response => {
                console.log(response.data);
                if (response.data.accessToken) {
                    localStorage.setItem("userTicket", JSON.stringify(response.data.accessToken));
                }
                return response.data;
            });
    },


    logout() {
        localStorage.removeItem("userTicket");
    },

    getCurrentUser() {
        return localStorage.getItem('userTicket');
    },
}