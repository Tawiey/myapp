/**
 * Created by tawanda on 12/7/16.
 */
angular.module('nodeTodo', [])
    .controller('mainController', ($scope, $http) => {
        $scope.formData = {};
        $scope.todoData = {};
        $scope.mailData = {};
        // Get all todos
        $http.get('/admin/jobs')
            .success((data) => {
                $scope.todoData = data;
                console.log($scope.todoData);
                swal({   title: "Mac's World",
                    text: "Authenticate yourself stranger",
                    type: "input",
                    showCancelButton: false,
                    closeOnConfirm: false,
                    animation: "slide-from-top",
                    inputPlaceholder: "Enter passkey",
                    inputType: "password"
                },
                    function(inputValue){
                        if (inputValue === false) return false;
                        if (inputValue === "") {
                            swal.showInputError("Stranger!, Enter your passkey");
                            return false   }
                        if (inputValue === "myserverside") {
                            swal("Welcome Tawanda", "Admin side maintenance", "success");
                        }
                        else if(inputValue === "iamallan"){
                            swal("Welcome Bitch", "Admin side maintenance", "success");
                        }
                        else {
                        swal.showInputError("Incorrect passkey, this incident will be reported");}
                    });
            })
            .error((error) => {
                console.log('Error: ' + error);
            });


$scope.createTodo = () => {
    $scope.vname = angular.isUndefined($scope.formData.name);
    $scope.vemail = angular.isUndefined($scope.formData.email);
    $scope.vsubject = angular.isUndefined($scope.formData.subject);
    $scope.vcontact = angular.isUndefined($scope.formData.contact);

    if($scope.vname || $scope.vemail || $scope.vsubject || $scope.vcontact){
        swal("Missing info", "Please make sure everything is filled in", "warning");
    }
    else if($scope.formData.name === "" || $scope.formData.email === "" || $scope.formData.subject === "" || $scope.formData.contact === "" || $scope.formData.text === ""){
        swal("Missing info", "Please make sure everything is filled in", "warning");
    }
    else {
        swal({
                title: "Post A Job",
                text: "These details are correct and lets do this",
                type: "warning",
                confirmButtonText: "Submit",
                showCancelButton: true,
                closeOnConfirm: false,
                showLoaderOnConfirm: true,
                animation: "slide-from-bottom"
            },
            function () {
                $http.post('/admin/insert', $scope.formData)
                    .success((data) => {
                        $scope.mailData = $scope.formData;
                        console.log($scope.formData);
                        $scope.formData = {};
                        $scope.todoData = data;

                        swal("Lets Do It!", "Job successfully added to database", "success");
                        console.log(data);
                    })
                    .error((error) => {
                        console.log('Error: ' + error);
                        swal('Snap, something is not right', 'Error: ' + error, "error");
                    });
            });
    }
};
        $scope.sendMail = () => {
            $scope.vname = angular.isUndefined($scope.mailData.name);
            $scope.vemail = angular.isUndefined($scope.mailData.email);
            $scope.vsubject = angular.isUndefined($scope.mailData.subject);
            $scope.vcontact = angular.isUndefined($scope.mailData.contact);

            if($scope.vname || $scope.vemail || $scope.vsubject || $scope.vcontact) {
                console.log("Missing info", "Please make sure everything is filled in", "warning");
            }

            else if($scope.formData.name === "" || $scope.formData.email === "" || $scope.formData.subject === "" || $scope.formData.contact === "" || $scope.formData.text === ""){
                console.log("Come on, feel in the info properly, warning");
            }
            else {
                $http.post('/send', $scope.mailData)
                    .success((data) => {
                        $scope.mailData = {};
                        console.log(data);
                    })
                    .error((error) => {
                        console.log('Error: ' + error);
                    });
            }
        };
// Delete a todo
$scope.updateTodo = (todoID) => {
    $http.post('/admin/update/' + todoID)
        .success((data) => {
            $scope.todoData = data;
            console.log(data);
        })
        .error((data) => {
            console.log('Error: ' + data);
        });
};
    });


