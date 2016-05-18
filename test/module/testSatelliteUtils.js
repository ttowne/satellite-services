import satelliteUtils from 'module/satelliteUtils';

describe('Test satelliteUtils', function () {
    var originalTimeout;

    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10;
    });

    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    describe('createResolvedChain', function () {

        it('will return null if no object is passed in', function () {
            expect(satelliteUtils.createResolvedChain(['test'])).toBe(null);
        });

        it('will return unmodified object if no path is passed in', function () {
            expect(satelliteUtils.createResolvedChain([''], {})).toEqual({});
        });

        it('will return a function that returns a resolved promise', function (done) {
            var resolved = jasmine.createSpy('resolved'),
                rejected = jasmine.createSpy('rejected'),
                promise = satelliteUtils.createResolvedChain(['test'], {})();

            expect(promise instanceof Promise).toBe(true);
            promise.then(resolved, rejected);

            expect(resolved).not.toHaveBeenCalled();
            expect(rejected).not.toHaveBeenCalled();

            setTimeout(function () {
                expect(resolved).toHaveBeenCalled();
                expect(rejected).not.toHaveBeenCalled();
                done();
            }, 1);
        });

        it('will build a complete path of functions', function (done) {
            var obj = {},
                resolved = jasmine.createSpy('resolved'),
                rejected = jasmine.createSpy('rejected');

            expect(satelliteUtils.createResolvedChain(['one', 'two', 'three'], obj)).toBe(obj.one.two.three);

            expect(obj.one() instanceof Promise).toBe(true);
            expect(obj.one.two() instanceof Promise).toBe(true);

            obj.one().then(resolved, rejected);
            obj.one.two().then(resolved, rejected);

            setTimeout(function () {
                expect(resolved.calls.count()).toEqual(2);
                expect(rejected).not.toHaveBeenCalled();
                done();
            }, 1)
        });

    });

});
