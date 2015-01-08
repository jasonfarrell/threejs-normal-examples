/*global angular */
angular.module('contactsApp')
    .controller('ContactsListController', ['ContactsService', '$window', function(ContactsService, $window) {
        var self;
        self = this;
        self.contacts = [];
        ContactsService.query().then(function(contacts) {
            self.contacts = contacts;
        });
        // jshint ignore:start
        // `delete` is a reserved word.
        // `first_name` and `last_name` are not camel case.
        self.delete = function(contact) {
            var confirm;
            confirm = $window.confirm('Are you sure you want to delete ' + contact.first_name + ' ' + contact.last_name + '?');
            if (confirm) {
                ContactsService.delete(contact);
            }
        };
        // jshint ignore:end
    }])
;
