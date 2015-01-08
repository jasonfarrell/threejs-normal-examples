describe('Sanity check', function() {
    it('should be able to navigate to the contact list', function() {
        browser.get('/');
        expect(element(by.css('.contacts-list')).isDisplayed()).toBe(true);
    });
    it('should be able to navigate to single contact', function() {
        browser.get('/contacts/1');
        expect(element(by.css('.contact-single')).isDisplayed()).toBe(true);
    });
});
