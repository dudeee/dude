import 'mocha';
import chai from 'chai';
import Filters, { filterable } from '../src/tools/filters';
chai.should();

describe('Filters', () => {

  beforeEach(() => {
    Filters.clear();
  });

  class Testing {
    @filterable('test')
    static test(a, b, c) {
      let z = a + b;

      return z + c;
    }
  }

  describe('preprocess', () => {
    it('should modify the arguments of functions', () => {
      let id = Filters.preprocess('test', (a, b, c) => {
        a += 5;

        return [a, b, c];
      });

      let result = Testing.test(1, 1, 1);
      result.should.equal(8);
    })
  })

  describe('postprocess', () => {
    it('should modify the return value of functions', () => {
      let id = Filters.postprocess('test', value => {
        return value + '-ok';
      });

      let result = Testing.test(1, 1, 1);
      result.should.equal('3-ok');
    })
  })

  describe('remove', () => {
    it('should remove the specified filter', () => {
      let first = Filters.postprocess('test', value => {
        return 0;
      });

      let second = Filters.postprocess('test', value => {
        return 1;
      });

      Filters.remove('test', first);

      let result = Testing.test(1, 1, 1);
      result.should.equal(1);

      Filters.remove('test', second);
    })
  })

  describe('clear', () => {
    it('should clear all the filters', () => {
      Filters.postprocess('test', () => {});
      Filters.preprocess('test', () => {});

      Filters.clear();

      Filters.list().should.deep.equal({});
    })
  })

  describe('list', () => {
    it('should list the filters', () => {
      Filters.postprocess('test');
      Filters.preprocess('test');
      Filters.postprocess('test2');

      let list = Filters.list();

      list.test.should.have.length(2);
      list.test2.should.have.length(1);
    })
  })
})
