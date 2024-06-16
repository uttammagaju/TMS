/// <reference path="teacher.model.js" />


var TeacherController = function () {
    const baseURL = "/api/TeacherAPI"
    var self = this;
    self.newTeacher = ko.observable(new TeacherModel())
    self.teachers = ko.observableArray([]);
    self.getDatas = function () {
        ajax.get(baseURL).then(function (result) {
            self.teachers(result);
            var datas = ko.utils.arrayMap(result, (item) => {
                return new TeacherModel(item);
            });
        });
    }

    self.getDatas();
    self.AddTeacher = function () {
        ajax.post(baseURL + "/PostTeacher", ko.toJS(self.newTeacher()))
            .done(function (result) {
                self.teachers.push(new TeacherModel(result));
                self.getDatas();

            })
            .fail((err) => {
                console.log(err);
            });
    }

}

    var ajax = {
        get: function (url) {
            return $.ajax({
                method: "GET",
                url: url,
                async: false,

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
                data: JSON.stringify(model)
            });
    }
    }
const mode = {
    create: 1,
    update: 2
};