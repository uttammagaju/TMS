/// <reference path="../Knockout.js" />
var TeacherModel = function (item) {
    var self = this;
    item = item || {};
    self.id = ko.observable(item.id || 0);
    self.firstName = ko.observable(item.firstName || '');
    self.lastName = ko.observable(item.lastName || '');
    self.address = ko.observable(item.address || '');
    self.gender = ko.observable(item.gender || '');
    self.dob = ko.observable(item.dob || '');
    self.qualification = ko.observable(item.qualification || '');
    self.salary = ko.observable(item.salary || '');
}
