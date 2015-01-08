/*global angular */
angular.module('contactsApp')
    .controller('ContactsSingleController', ['ContactsService', '$routeParams', '$location', function(ContactsService, $routeParams, $location) {
        var self;
        self = this;
        ContactsService.contactDetails($routeParams.id).then(function(response) {
            self.contact = response.data.data;
        });
        self.updateContact = function(contact) {
            ContactsService.update(contact).then(function() {
                $location.url('/');
            });
        };
    }])
;
