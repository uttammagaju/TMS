/// <reference path="Course.Model.js" />




// Define modes for creating and updating course
const mode = {
    create: 1,
    update: 2
};

// Define the CourseController
var CourseController = function () {
    var self = this;
    const baseURL = "/api/CourseAPI";
    self.NewCourse = ko.observable(new CourseModel());
    self.Courses = ko.observableArray([]);

    self.getDatas = function () {
        return ajax.get(baseURL).then(function (result) {
            self.Courses(result.map(item => new CourseModel(item))); // Convert result to TeacherModel instances
        });
        console.log(ko.toJS(self.Courses));
    };
    self.getDatas();
}

// Define ajax utility for making GET requests
var ajax = {
    get: function (url) {
        return $.ajax({
            method: "GET",
            url: url,
            async: false, // Consider setting async to true for proper async handling
        });
    }
};

