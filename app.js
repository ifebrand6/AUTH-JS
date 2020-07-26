const main_index = document.getElementById('main_index')
const user = {
    new_user() {
        var formElement = document.createElement('form')
        formElement.innerHTML = `
        <h2>Add new details to create an auth.</h2>
            <input type="text" name="" id="user_name" placeholder="enter your name" required>
            <br>
            <input type="password" name="" id="password" placeholder="enter password" required>
            <br>
            <input type="password" name="" id="confirmed_password"  placeholder="confirm password">
            <br>
            <span id='error' style="color: red; font-style: italic;"></span> 
            <br>
            <input type="submit" value="Create Auth">
        `
        formElement.id = 'user_form';
        formElement.addEventListener('submit', create_user);
        return formElement;
    },
    new_session() {
        var formElement = document.createElement('form')
        formElement.innerHTML = `
            <h2> Enter your credentials </h2>
            <input type="text" name="" id="user_name" placeholder=${localStorage.user_name} disabled=true>
            <br>
            <input type="password" name="" id="password" placeholder="enter password" required>
            <br>
            <span id='error' style="color: red; font-style: italic;"></span> 
            <br>
            <input type="submit" value="Login">
        `
        formElement.id = 'user_form';
        formElement.addEventListener('submit', create_session);
        return formElement;
    },
    restrict_user() {
        const restriction_page = document.createElement('div')
        restriction_page.innerHTML = `
        <h1> YOU ARE NOT AUTHORISE TO ACCESS THIS PAGE </h1>
        <p>you need to <button id="new_user" onclick='handle_new_user()'>CREATE AUTH </button>.</p>
        <br>
        `;
        restriction_page.id = 'restriction'
        document.getElementById('main_index').remove()
        document.getElementById('main').appendChild(restriction_page);
    }
}
const handle_new_user = (event) => {
    document.getElementById('restriction').remove();
    document.getElementById('insertables').appendChild(user.new_user());
};

function create_user(event) {
    event.preventDefault()
    let user_name = document.getElementById('user_name').value;
    let password = document.getElementById('password').value;
    let confirmed_passowrd = document.getElementById('confirmed_password').value
    if (password === confirmed_passowrd) {
        setAuth(user_name, password)
        document.getElementById('insertables').remove()
        document.getElementById('main').appendChild(main_index)
    } else {
        document.getElementById('error').textContent = 'password do not match'

    }
}

function setAuth(user_name, password) {
    localStorage.setItem("user_name", user_name);
    sessionStorage.setItem('password', password);
    localStorage.setItem('psd', password)
}

function setAuthR(password) {
    sessionStorage.setItem('password', password);
}

const handle_new_session = () => {
    document.getElementById('main_index').remove()
    document.getElementById('main').appendChild(user.new_session());

};

function create_session(event) {
    event.preventDefault()
    let password = document.getElementById('password').value;
    if (password === localStorage.psd) {
        setAuthR(password)
        document.getElementById('user_form').remove()
        document.getElementById('main').appendChild(main_index)
    } else {
        document.getElementById('error').textContent = 'wrong password'
    }
}

const handle_delete_user = () => {
    console.log("Hi i will destroy all")
    localStorage.clear();
    sessionStorage.clear();
    location.reload()
}

if (!localStorage.user_name) {
    user.restrict_user()
}
if (!sessionStorage.password && localStorage.user_name) {
    handle_new_session()

}