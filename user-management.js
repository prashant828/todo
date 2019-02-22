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

    populateUsers();
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

    $(document).on('click', '#save-user', function(){
        let name = $('#enter-user').val().trim();
        if (name) {
            userOperations(name, 'add')
        }
    })

    $(document).on('click', '.delete-user', function(){
       let name = $(this).siblings('.user').text();
       userOperations(name, 'delete')
    });

    $(document).on('click', '.edit-user', function(){
      $('#save-user').attr('id', 'update-user').text('Update User');
      let name = $(this).siblings('.user').text();
      let index = currentUsers.findIndex(user=>user===name)
      $('#enter-user').attr('data', index).val(name);
    })

    $(document).on('click', '#update-user', function(){
      let index = $('#enter-user').attr('data');
      currentUsers[index] = $('#enter-user').val();
      $('#update-user').attr('id', 'save-user' ).text('Save');
      addToLocalStorage(currentUsers);
      populateUsers()
    })

})
