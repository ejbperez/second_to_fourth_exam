'user strict';
$(function(){
var server = '/tri7exam/';

//EVENTS


    fetch_all();

    $('#save-data').click(function(){
        insert_user()
    })

    $('#update-data').click(function(){
        update_user()
    })

    $(document).on("click","#edit-btn",function(){
        let id = $(this).attr("data-id");
        fetch_single_user(id);
    })
    
    $(document).on("click","#delete-btn",function(){
        let id = $(this).attr("data-id");
        delete_user(id)
    })


//FUNCTIONS


    function insert_user()
    {
        let data = {
            'first_name': $('#input1').val(),
            'last_name': $('#input2').val(),
            'position': $('#input3').val()
        };

        ajax('create-user', data, function() {
        }).done(function(response) {
            if(response.code == 0){
                $('#alert').fadeIn();
            }else{
                $('#alert').fadeOut();
                alert("User created successfully!");
                location.reload();
            }
        })
    }

    
    function fetch_single_user(id)
    {
        ajax('single_user', obj={id:id}, function() {
        }).done(function(response) {
            // console.log(response.data[0].first_name)
            $('#edit-input1').val(response.data[0].first_name);
            $('#edit-input2').val(response.data[0].last_name);
            $('#edit-input3').val(response.data[0].position);
            $('#id').val(response.data[0].id);
        })
    }

    function update_user()
    {
        let data = {
            'first_name': $('#edit-input1').val(),
            'last_name': $('#edit-input2').val(),
            'position': $('#edit-input3').val(),
            'id': $('#id').val()
        };
        // console.log(data);

        ajax('update_user', data, function() {
        }).done(function(response) {
            if(response.code == 0){
                $('.alert').fadeIn();
            }else{
                $('.alert').fadeOut();
                alert("User updated successfully!");
                location.reload();
            }
        })
    }


    function delete_user(id)
    {
        ajax('delete_user', obj={id:id}, function() {
        }).done(function(response) {
            // console.log(response)
            if(response.code == 1){
                alert('User successfully deleted!');
                location.reload();
            }else{
                alert('There was a problem deleting this user.');
                location.reload();
            }
        })
    }


    function fetch_all()
    {
        ajax('all_users', obj={}, function() {
        }).done(function(response) {
            console.log(response.data);
            var output = [];
            $.each(response.data, function(key, val) {
                output += '<tr id="' + val.id + '">';
                output += '<td>' + (key + 1) + '</th>';
                output += '<td>' + val.first_name + '</td>';
                output += '<td>' + val.last_name + '</td>';
                output += '<td>' + val.position + '</td>';
                output += '<td>' + val.create_date + '</td>';
                output += `<td> <a class="btn btn-yellow btn-sm" id="edit-btn" role="button" data-toggle="modal" data-target="#editpage" data-id="`+ val.id +`">
                                    Edit
                                </a>

                                <a class="btn btn-danger btn-sm" id="delete-btn" role="button" data-id="`+ val.id +`">
                                    Delete
                                </a>
                            </td>`;
                output += '</tr>';
            });
            $('#user-data').html(output);
        })
    }


    
    function ajax(url, obj, beforeSend) {
        return $.ajax({
            url: server + url,
            type: "POST",
            data: obj,
            beforeSend: function() {
                beforeSend();
            },
        })
    }
})