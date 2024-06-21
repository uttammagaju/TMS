/// <reference path="../knockout.js" />

var DropdownVm = function (item) {
    var self = this;
    item = item || {};
    self.Id = ko.observable(item.id || 0);
    self.Name = ko.observable(item.name || '');
};

var CourseVM = function (item) {
    var self = this;
    item = item || {};
    self.Id = ko.observable(item.id || 0);
    self.Name = ko.observable(item.name || '');
    self.CreditHour = ko.observable(item.creditHour || '');
    self.TeacherId = ko.observable(item.teacherId || 0);
    self.TeacherName = ko.observable(item.teacherName || '');
};
