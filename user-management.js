$(function () {
    let currentUsers = JSON.parse(localStorage.getItem('users'));
    const populateUsers = () => {
        if (currentUsers) {
            $('.user-row').remove()
            for (i = 0; i < currentUsers.length; i++) {
                $('.list-div').append("<div class=user-row>" +
                    "<span class=user>" + currentUsers[i] + "</span>" +
                    "<button class=edit-user type=button>Edit</button>" +
                    "<button class=delete-user type=button>Delete</button>" +
                    "</div>")
            }
        }
    }

    populateUsers()
    const addToLocalStorage = (data) => {
        localStorage.users = JSON.stringify(data)
    }
    //add user with this function pass the name of the user as an argument
    const userOperations = (name, operation) => {

        switch (operation) {
            case 'add':
                if (!currentUsers) {
                    currentUsers = [];
                };
                currentUsers.push(name);
                addToLocalStorage(currentUsers);
                populateUsers();
                break;
            case 'delete':
                let userIndex = currentUsers.findIndex(user => user.name === name);
                currentUsers.splice(userIndex);
                addToLocalStorage(currentUsers);
                populateUsers();
                break;
        }
    }

    $('#save-user').on('click', () => {
        let name = $('#enter-user').val().trim();
        if (name) {
            userOperations(name, 'add')
        }
    })

    $(document).on('click', '.delete-user', function(){
       let name = $(this).siblings('.user').text();
       userOperations(name, 'delete')
    });
    
})