// jshint ignore:start
describe('Header controller', function() {

    var ctrl;
    var mockBackend;

    beforeEach(module('contactsApp'));

    beforeEach(inject(function($controller, $httpBackend) {
        mockBackend = $httpBackend;
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
        ctrl = $controller('HeaderController');
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

    afterEach(function() {
        mockBackend.verifyNoOutstandingExpectation();
        mockBackend.verifyNoOutstandingRequest();
    });
});
// jshint ignore:end
