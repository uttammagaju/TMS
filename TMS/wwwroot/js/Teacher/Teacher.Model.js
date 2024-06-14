/// <reference path="../../knockout.js" />
var DepartmentModel = function (item) {
    var self = this;
    item = item || {};
    self.departmentId = item.departmentId || 0;
    self.departmentName = item.departmentName || '';
}