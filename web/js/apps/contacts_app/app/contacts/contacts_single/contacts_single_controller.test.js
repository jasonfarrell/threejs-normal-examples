// jshint ignore:start
describe('Contact single controller', function() {

    var ctrl;
    var locationMock;
    var mockBackend;

    beforeEach(module('contactsApp'));

    beforeEach(inject(function($controller, $httpBackend) {
        var routeParams = {
            id: "1"
        };
        mockBackend = $httpBackend;
        mockBackend.expectGET('http://reqr.es/api/users/1')
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
        locationMock = {
            url: function(url) {
                return true;
            }
        };
        ctrl = $controller('ContactsSingleController', {
            $routeParams: routeParams,
            $location: locationMock
        });
    }));

    it('should load items from the server', function() {
        expect(ctrl.contact).toBeUndefined();
        mockBackend.flush();
        expect(ctrl.contact).toEqual([
            {
                id: 1,
                first_name: 'Bret',
                last_name: 'Morris'
            }
        ]);
    });

    it('should update an item on the server', function() {
        expect(ctrl.contact).toBeUndefined();
        mockBackend.flush();
        expect(ctrl.contact).toEqual([
            {
                id: 1,
                first_name: 'Bret',
                last_name: 'Morris'
            }
        ]);
        mockBackend.expectPUT('http://reqr.es/api/users/1')
            .respond({
                data: [
                    {
                        id: 1,
                        first_name: 'Jason',
                        last_name: 'Morris'
                    }
                ]
            })
        ;
        ctrl.contact = {
            id: 1,
            first_name: 'Jason',
            last_name: 'Morris'
        };
        ctrl.updateContact(ctrl.contact);
        mockBackend.flush();
        expect(ctrl.contact).toEqual(ctrl.contact);
    });

    afterEach(function() {
        mockBackend.verifyNoOutstandingExpectation();
        mockBackend.verifyNoOutstandingRequest();
    });
});
// jshint ignore:end
