/*global angular */
angular.module('contactsApp')
    .factory('ContactsService', ['$http', function($http) {
        var contacts = [];
        var contactsPromise;
        return {
            query: function() {
                if (!contactsPromise) {
                    contactsPromise = $http.get('http://reqr.es/api/users').then(function(response) {
                        contacts = response.data.data;
                        return contacts;
                    });
                }
                return contactsPromise;
            },
            delete: function(contact) { // jshint ignore:line
                var index;
                $http.delete('http://reqr.es/api/users/' + contact.id).then(function() { // jshint ignore:line
                    index = contacts.indexOf(contact);
                    contacts.splice(index, 1);
                });
            },
            contactDetails: function(contactId) {
                return $http.get('http://reqr.es/api/users/' + contactId);
            },
            update: function(contact) {
                var i;
                return $http.put('http://reqr.es/api/users/' + contact.id).then(function() { // jshint ignore:line
                    for (i = 0; i < contacts.length; i += 1) {
                        if (contacts[i].id === contact.id) {
                            contacts[i] = contact;
                        }
                    }
                });
            }
        };
    }])
;
