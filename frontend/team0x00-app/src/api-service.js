import users from "./data/users";

const API_URL = "http://localhost:8000/"
const TOKEN = "asdfasdfasdf1234";

const headers = {'Content-Type': 'application/json'}

export class API {
    static async login(credentials) {
        console.log(JSON.stringify(credentials));
        return fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'same-origin',
          body: JSON.stringify(credentials)
        })
          .then(data => data.json())
          .catch((error) => {
            console.log('error: ' + error)
          })
    }

    static async signup(credentials) {
      return fetch(API_URL+'signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })
        .then(data => data.json())
    }

    static async logout() {
      return fetch('/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
      })
        .then(data => data.json())
    }

    static async getComments(credentials) {
        return fetch('http://localhost:8000/getcomments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
        })
          .then(data => data.json())
    }

    // static loginUser(body) {
    //   return fetch(`http://127.0.0.1:8000/auth/`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify( body )
    //   }).then( resp => resp.json())
    // }

    static registerUser(credentials) {
      return fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( credentials )
      }).then( resp => resp.json())
    }

    //Example call:
    //API.updateProfile(profile_id, {name, sex}).then( resp => console.log(resp)).catch( error => console.log(error))
    static updateProfile(profile_id, body) {
        return fetch(`http://127.0.0.1:/8000/api/profile/${profile_id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application-json',
                'Authorization' : `Token ${TOKEN}`
            },
            body : JSON.stringify( body )
        }).then( resp => resp.json())
    }
  
    static getAllCAFFs(token){
      return fetch("http://127.0.0.1:8000/api/getallcaffs/", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}` 
        }
      }).then( resp => resp.json())
    }

    static updateCAFF(caff_id, body, token) {
      return fetch(`http://127.0.0.1:8000/api/caff/${caff_id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify( body )
      }).then( resp => resp.json())
    }

    static createCAFF(body, token) {
      return fetch(`http://127.0.0.1:8000/api/caff/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify( body )
      }).then( resp => resp.json())
    }

    static deleteCAFF(caff_id, token) {
      return fetch(`http://127.0.0.1:8000/api/caff/${caff_id}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        }
      })
    }

    static deletePost(post) {
      alert("API call to delete " + post.title + ".")
    }

    static getAllUsers(){
      return users;
    }

    static setAsAdmin(user){
      // TODO
      alert("API call to make" + user.username + " admin.")
    }

    static deleteUser(user) {
      alert("API call to delete " + user.username +".")
    }

    static async post(post) {
      return fetch('/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        body: JSON.stringify(post)
      })
        .then(data => data.json())
        .catch((error) => {
          throw error;
        })
  }

}