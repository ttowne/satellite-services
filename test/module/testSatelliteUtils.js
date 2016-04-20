import satelliteUtils from 'satelliteUtils';

describe('Test satelliteUtils', function () {

    describe('createResolvedChain', function () {

        it('will return null if no object is passed in', function () {
            expect(satelliteUtils.createResolvedChain(['test'])).toBe(null);
        });

        it('will return unmodified object if no path is passed in', function () {
            expect(satelliteUtils.createResolvedChain([''], {})).toEqual({});
        });

        it('will return a function that returns a resolved promise', function () {
            expect(satelliteUtils.createResolvedChain(['test'], {})().isResolved()).toBe(true);
        });

        it('will build a complete path of functions', function () {
            var obj = {};

            expect(satelliteUtils.createResolvedChain(['one', 'two', 'three'], obj)).toBe(obj.one.two.three);

            expect(obj.one().isResolve()).toBe(true);
            expect(obj.one.two().isResolve()).toBe(true);
        });

    });

});
