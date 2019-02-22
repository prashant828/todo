$(function () {
    let accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    let loggedInUser = '';

    //method to add data in local storage
    const addToLocalStorage = (key, data) => {
        localStorage[key] = JSON.stringify(data)
    }

    $('#register').on('click', function(){
        let userDetail = {
            name: $('#user').val().trim(),
            password: $('#password').val(),
            users: []
        }
        for(i=0; i<accounts.length; i++){
            if(accounts[i].name===userDetail.name){
                alert('user already exists')
                return
            }
        }
        accounts.push(userDetail);
        addToLocalStorage('accounts', accounts)
    });

    $('#login').on('click', function(){
        let name = $('#user').val().trim();
        let pass = $('#password').val().trim();
        for(i=0; i<accounts.length; i++){
            if(accounts[i].name === name && accounts[i].password===pass){
                loggedInUser = accounts[i].name;
                $('.login').hide()
                $('.dashboard').fadeIn()
                populateUsers();
                return;
            }
        }
        alert('user does not exist')
    })


//dashboard
    const populateUsers = () => {
        if (loggedInUser) {
            $('.user-row').remove()
            let index = accounts.findIndex(account=>account.name===loggedInUser);
            let userList = accounts[index].users
            for (i = 0; i < userList.length; i++) {
                $('.list-div').append("<div class=user-row>" +
                    "<span class=user>" + userList[i] + "</span>" +
                    "<button class=edit-user type=button>Edit</button>" +
                    "<button class=delete-user type=button>Delete</button>" +
                    "</div>")
            }
            $('input').val('')
        }
    }

    const userOperations = (name, operation) => {
        let index = accounts.findIndex(account=>account.name===loggedInUser);
        switch (operation) {
            case 'add':
                accounts[index].users.push(name);
                addToLocalStorage('accounts', accounts);
                populateUsers();
                break;
            case 'delete':
                console.log(accounts[index].users)
                let userIndex = accounts[index].users.findIndex(user => user === name);
                console.log(userIndex)
                accounts[index].users.splice(userIndex, 1);
                addToLocalStorage('accounts',accounts);
                populateUsers();
                break;
        }
    }

    $(document).on('click', '#save-user', function () {
        let name = $('#enter-user').val().trim();
        if (name) {
            userOperations(name, 'add')
        }
    })

    $(document).on('click', '.delete-user', function () {
        let name = $(this).siblings('.user').text();
        userOperations(name, 'delete')
    });

    $(document).on('click', '.edit-user', function () {
        let accountIndex = accounts.findIndex(account=>account.name===loggedInUser);
        $('#save-user').attr('id', 'update-user').text('Update User');
        let name = $(this).siblings('.user').text();
        let index = accounts[accountIndex].users.findIndex(user => user === name)
        $('#enter-user').attr('data', index).val(name);
    })

    $(document).on('click', '#update-user', function () {
        let accountIndex = accounts.findIndex(account=>account.name===loggedInUser);
        let index = $('#enter-user').attr('data');
        accounts[accountIndex].users[index] = $('#enter-user').val();
        $('#update-user').attr('id', 'save-user').text('Save');
        addToLocalStorage('accounts',accounts);
        populateUsers()
    })

})
