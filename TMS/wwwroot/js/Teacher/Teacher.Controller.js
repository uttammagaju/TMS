

var DepartmentController = function () {

    var self = this;
    self.newDepartment = ko.observable(new DepartmentModel())
    self.departments = ko.observableArray();

    const baseURL = "/api/DepartmentAPI"




    ajax.get(baseURL).then(function (result) {
        self.departments(result);
        var datas = ko.utils.arrayMap(result, (item) => {
            return new DepartmentModel(item);
        });
    });
    self.AddDepartment = function () {

        ajax.post(baseURL, ko.toJSON(new self.newDepartment()))
            .done((result) => {
                self.departments.push(new DepartmentModel(result));
                self.newDepartment(new DepartmentModel());
                console.log(self.newDepartment());
            }).fail((err) => {
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
