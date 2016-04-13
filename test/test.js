describe('Has Test Dependencies', function () {

    describe('ECMA 6 Requirements', function () {

        it('Has Array Reduce', function () {
            expect([].reduce).toBeDefined();
        });

    });
});