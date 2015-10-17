import 'mocha';
import chai from 'chai';
import Filters, { filterable } from '../src/tools/filters';
chai.should();

describe('Filters', () => {

  class Testing {
    @filterable('test')
    static test(a, b, c) {
      let z = a + b;

      return z + c;
    }
  }

  describe('preprocess', () => {
    it('should modify the arguments of functions', () => {
      let { id } = Filters.preprocess('test', (a, b, c) => {
        a += 5;

        return [a, b, c];
      });

      let result = Testing.test(1, 1, 1);
      result.should.equal(8);

      Filters.remove('test', id);
    })
  })

  describe('postprocess', () => {
    it('should modify the return value of functions', () => {
      let { id } = Filters.postprocess('test', value => {
        return value + '-ok';
      });

      let result = Testing.test(1, 1, 1);
      result.should.equal('3-ok');

      Filters.remove('test', id);
    })
  })

  describe('remove', () => {
    it('should remove the specified filter', () => {
      let { id: first } = Filters.postprocess('test', value => {
        console.log('first filter');
        return 0;
      });

      let { id: second } = Filters.postprocess('test', value => {
        console.log('second filter');
        return 1;
      });

      Filters.remove('test', first);

      let result = Testing.test(1, 1, 1);
      result.should.equal(1);

      Filters.remove('test', second);
    })
  })
})
