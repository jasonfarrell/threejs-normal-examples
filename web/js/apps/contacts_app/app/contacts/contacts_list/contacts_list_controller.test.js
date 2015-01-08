// jshint ignore:start
describe('Contact list controller', function() {

    var ctrl;
    var mockBackend;
    var windowMock;

    beforeEach(module('contactsApp'));

    beforeEach(inject(function($controller, $httpBackend) {
        mockBackend = $httpBackend;
        windowMock = {
            // Always confirm the confirmation message
            confirm: function(msg) {
                return true
            }
        }
        mockBackend.expectGET('http://reqr.es/api/users')
            .respond({
                data: [
                    {
                        id: 1,
                        first_name: 'Bret',
                        last_name: 'Morris'
                    }
                ]
            })
        ;
        ctrl = $controller('ContactsListController', {
            $window: windowMock
        });
    }));

    it('should load items from the server', function() {
        expect(ctrl.contacts).toEqual([]);
        mockBackend.flush();
        expect(ctrl.contacts).toEqual([
            {
                id: 1,
                first_name: 'Bret',
                last_name: 'Morris'
            }
        ]);
    });

    it('should delete contact from the server', function() {
        expect(ctrl.contacts).toEqual([]);
        mockBackend.flush();
        expect(ctrl.contacts).toEqual([
            {
                id: 1,
                first_name: 'Bret',
                last_name: 'Morris'
            }
        ]);
        mockBackend.expectDELETE('http://reqr.es/api/users/1')
            .respond({
                data: []
            })
        ;
        ctrl.delete(ctrl.contacts[0]);
        mockBackend.flush();
        expect(ctrl.contacts).toEqual([]);
    });

    afterEach(function() {
        mockBackend.verifyNoOutstandingExpectation();
        mockBackend.verifyNoOutstandingRequest();
    });
});
// jshint ignore:end
