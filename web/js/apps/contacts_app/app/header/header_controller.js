/*global angular */
angular.module('contactsApp')
    .controller('HeaderController', ['ContactsService', '$log', function(ContactsService, $log) {
        var self;
        self = this;
        self.contacts = [];
        ContactsService.query().then(function(contacts) {
            self.contacts = contacts;
        }, function(error) {
            $log.log(error);
        });
    }])
;
