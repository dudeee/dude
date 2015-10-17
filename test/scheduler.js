import 'mocha';
import chai from 'chai';
import Scheduler from '../src/tools/scheduler';
chai.should();

const DELAY = 100;
const LONG_DELAY = 10000;

describe('Scheduler', function() {
  this.timeout(LONG_DELAY);

  describe('pattern methods', () => {
    it('should set pattern correctly', done => {
      let count = 0;
      let job = new Scheduler({
        task() {
          count++;
        }
      }).second('*/2').start();

      setTimeout(() => {
        count.should.equal(2);
        done();
      }, 3000)
    })
  });

  describe('Date-based scheduling', () => {
    it('should run the task on the specified time', done => {
      let count = 0;
      let job = new Scheduler({
        task() {
          count++;
        },
        time: new Date() + 1000
      }).start();

      setTimeout(() => {
        count.should.equal(1);
        done();
      }, 1100);
    })
  })

  describe('cancel', () => {
    it('should cancel the job correctly', done => {
      let count = 0;
      let job = new Scheduler({
        task() {
          count++;
        }
      }).start();

      job.cancel();

      setTimeout(() => {
        count.should.equal(0);
        done();
      }, 2000);
    })
  });
})
