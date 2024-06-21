/// <reference path="teacher.model.js" />

// Define modes for creating and updating teachers
const mode = {
    create: 1,
    update: 2
};

// Define the TeacherController
var TeacherController = function () {
    var self = this;
    const baseURL = "/api/TeacherAPI";  // Base URL for the Teacher API

    // Observables for new teacher, list of teachers, update flag, mode, and selected teacher
    self.newTeacher = ko.observable(new TeacherModel());
    self.teachers = ko.observableArray([]);
    self.IsUpdated = ko.observable(false);
    self.mode = ko.observable(mode.create);
    self.selectedTeacher = ko.observable(new TeacherModel());

    // Function to fetch teacher data from the server and populate the teachers array
    self.getDatas = function () {
        return ajax.get(baseURL).then(function (result) {
            self.teachers(result.map(item => new TeacherModel(item))); // Convert result to TeacherModel instances
        });
    };

    // Initial data fetch when the controller is instantiated
    self.getDatas();

    // Function to add or update a teacher based on the current mode
    self.AddTeacher = function () {
        switch (self.mode()) {
            case mode.create:  // Create mode
                ajax.post(baseURL + "/PostTeacher", ko.toJS(self.newTeacher()))
                    .done(function (result) {
                        self.teachers.push(new TeacherModel(result)); // Add the new teacher to the array
                        self.getDatas();
                        self.resetForm()// Refresh the list of teachers
                    })
                    .fail((err) => {
                        console.log(err);  // Log any errors
                    });
                break;
            case mode.update:  // Update mode
                ajax.put(baseURL + "/" + self.newTeacher().id(), ko.toJSON(self.newTeacher()))
                    .done((result) => {
                        self.teachers.replace(self.selectedTeacher(), new TeacherModel(result)); // Replace the updated teacher
                        self.getDatas();  // Refresh the list of teachers
                        self.resetForm();  // Reset the form
                    })
                    .fail((err) => {
                        console.log(err);  // Log any errors
                    });
                break;
        }
    };

    // Function to delete a teacher
    self.DeleteTeacher = function (model) {
        ajax.delete(baseURL + "/DeleteTeacher?id=" + ko.toJS(model).id)
            .done((result) => {
                self.teachers.remove(model);  // Remove the teacher from the array
                
                
            })
           
    };

    // Function to select a teacher for editing
    self.SelectTeacher = function (model) {
        self.selectedTeacher(model);  // Set the selected teacher
        self.newTeacher(new TeacherModel(ko.toJS(model)));  // Copy the selected teacher data to newTeacher
        self.IsUpdated(true);  // Set the update flag to true
        self.mode(mode.update);  // Set the mode to update
    };

    // Function to reset the form to its initial state
    self.resetForm = function () {
        self.newTeacher(new TeacherModel());  // Create a new empty teacher model
        self.selectedTeacher(new TeacherModel());  // Clear the selected teacher
        self.mode(mode.create);  // Set the mode to create
        self.IsUpdated(false);  // Reset the update flag
    };
};

// AJAX utility functions for making HTTP requests
var ajax = {
    get: function (url) {
        return $.ajax({
            method: "GET",
            url: url,
            async: false,  // Synchronous request (not recommended, consider changing to async: true)
        });
    },

    post: function (route, model) {
        return $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            url: route,
            data: JSON.stringify(model)  // Send the model data as JSON
        });
    },

    put: function (url, data) {
        return $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "PUT",
            url: url,
            data: data  // Send the updated data as JSON
        });
    },

    delete: function (route) {
        return $.ajax({
            method: "DELETE",
            url: route,  // Send a DELETE request to the specified route
        });
    }
};

// Instantiate the TeacherController
var teacherController = new TeacherController();
