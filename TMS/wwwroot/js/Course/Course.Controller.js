/// <reference path="teacher.model.js" />

// Define modes for creating and updating teachers
const mode = {
    create: 1,
    update: 2
};

var CourseController = function () {
    var self = this;
    const baseURL = "/api/CourseAPI";
    const teacherURL = "/api/CourseAPI/GetDropdownData";

    self.NewCourse = ko.observable(new CourseVM());
    self.SelectedCourse = ko.observable(new CourseVM());
    self.Courses = ko.observableArray([]);
    self.Teachers = ko.observableArray([]);
    self.IsUpdated = ko.observable(false);
    self.mode = ko.observable(mode.create);

    self.getDatas = function () {
        return ajax.get(baseURL).then(function (result) {
            self.Courses(result.map(item => new CourseVM(item)));
            console.log(ko.toJS(self.Courses));
        }).catch(function (error) {
            console.error("Error fetching data:", error);
        });
    };

    self.getTeachers = function () {
        return ajax.get(teacherURL).then(function (result) {
            var mappedTeachers = ko.utils.arrayMap(result, function (item) {
                return new DropdownVm(item);
            });
            self.Teachers(mappedTeachers);
        }).catch(function (error) {
            console.error("Error fetching teachers:", error);
        });
    };

    // Initialize data
    self.getDatas();
    self.getTeachers();

    self.AddCourse = function () {
        switch (self.mode()) {
            case mode.create:
                ajax.post(baseURL + "/", ko.toJS(self.NewCourse()))
                    .done(function (result) {
                        self.Courses.push(new CourseVM(result));
                        self.getDatas();
                        self.resetForm();
                    })
                    .fail((err) => {
                        console.log(err);
                    });
                break;
            case mode.update:
                ajax.put(baseURL, ko.toJS(self.NewCourse()))
                    .done(function (result) {
                        self.Courses.replace(self.SelectedCourse(), new CourseVM(result));
                        self.getDatas();
                        self.resetForm();
                    })
                    .fail((err) => {
                        console.log(err);
                    });
                break;
        }
    };

    // Function to delete a course
    self.DeleteCourse = function (model) {
        var courseId = ko.toJS(model).Id;
        ajax.delete(baseURL + "?id=" + courseId)
            .done((result) => {
                self.Courses.remove(model);  // Remove the course from the array
               
            })
            .fail(function (error) {
                console.error("Error deleting course:", error);
            });
    };

    self.SelectCourse = function (model) {
        self.SelectedCourse(model);
        self.NewCourse(new CourseVM(ko.toJS(model))); // Correct way to set NewCourse observable
        self.IsUpdated(true);
        self.mode(mode.update);
        console.log(self.NewCourse());
    };

    self.resetForm = function () {
        self.NewCourse(new CourseVM());
        self.SelectedCourse(new CourseVM());
        self.mode(mode.create);
        self.IsUpdated(false);
    };

    self.resetFormForRegister = function () {
        self.resetForm();
        self.IsUpdated(false);  // Explicitly set IsUpdated to false
    };
};

// AJAX utility functions for making HTTP requests
var ajax = {
    get: function (url) {
        return $.ajax({
            method: "GET",
            url: url,
            async: true,  // Asynchronous request
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
            data: JSON.stringify(data)  // Send the updated data as JSON
        });
    },

    delete: function (route) {
        return $.ajax({
            method: "DELETE",
            url: route,  // Send a DELETE request to the specified route
        });
    }
};

