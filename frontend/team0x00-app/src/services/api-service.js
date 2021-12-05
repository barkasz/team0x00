export class API {
    static async login(credentials) {
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

    static registerUser(credentials) {
      return fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( credentials )
      }).then( resp => resp.json())
    }

    static deletePost(post) {
      return fetch(`/post/${post._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin'
      })
    }

    static async getAllUsers(){
      return fetch(`/user/users`, {
        method: 'GET'
      })
        .then(data => data.json())
        .catch((error) => {
          throw error;
        })
    }

    static async setAsAdmin(user){
      //alert("API call to make" + user.username + " admin.")
      return fetch(`/user/${user.id}/role/admin`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
      })
        .then(data => data.json())
        .catch((error) => {
          throw error;
        })
    }

    static async deleteUser(user) {
      //alert("API call to delete " + user.username +".")
      return fetch(`/user/${user.id}`, {
        method: 'DELETE',
        credentials: 'same-origin',
      })
        .then(data => data.json())
        .catch((error) => {
          throw error;
        })
    }

    static async changePassword(user, newpassword){
      return fetch(`/user/${user.id}/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        body: JSON.stringify({"password":newpassword})
      })
        .then(data => data.json())
        .catch((error) => {
          throw error;
        })
    }


    static async getPosts(signal){
      return fetch('/post/posts', {
        signal: signal,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
      }).then(data => data.json())
        .catch((error) => {
          throw error;
        })
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

  static async uploadCaff(data) {
    return fetch('/upload', {
      method: 'POST',
      body: data
    }).then(data => data.json())
    .catch((error) => {
      throw error;
    })
}

  static async postComment(caff_id, content) {
    return fetch(`/post/${caff_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify(content)
    })
      .then(data => data.json())
      .catch((error) => {
        throw error;
      })
  }

  static async getPostById(caff_id) {
    return fetch(`/post/${caff_id}`, {
      method: 'GET'
    })
      .then(data => data.json())
      .catch((error) => {
        throw error;
      })
  }

  static async downloadGif(caff_id, signal) {
      return fetch(`/download/gif/${caff_id}`, {
        signal: signal,
        method: 'GET'
      })
      .then(res => res.blob())
      .then(blob => URL.createObjectURL(blob))
      .catch((error) => {
        if (error.name === 'AbortError') {
          console.log('successfully aborted');
        } else {
        throw error;
        }
      })
  }

  static async downloadCaff(caff_id, signal) {
      return fetch(`/download/caff/${caff_id}`, {
        signal: signal,
        method: 'GET'
      })
      .then(res => res.blob())
      .then(blob => URL.createObjectURL(blob))
      .catch((error) => {
        if (error.name === 'AbortError') {
          console.log('successfully aborted');
        } else {
        throw error;
        }
      })
  }

  static async searchPosts(title) {
    return fetch(`/post/search?title=${title}`, {
      method: 'GET'
    })
      .then(data => data.json())
      .catch((error) => {
        throw error;
      })
  }

}