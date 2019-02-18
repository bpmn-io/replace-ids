import { expect } from 'chai';

import replaceIds from '.';


describe('replace-ids', function() {

  it('should match pattern', function() {

    // given
    var id = 0;

    // when
    const replaced = replaceIds('{{ ID:a_1 }}{{ ID:1 }}{{ID }}{{ ID:a_1}}{{ ID:1 }}', () => id++);

    // then
    expect(replaced).to.eql('01201');
  });


  describe('generators', function() {

    it('should support function style', function() {

      // given
      let id = 0;

      const generator = function() {
        return id++;
      };

      // when
      const replaced = replaceIds('{{ ID }}{{ ID }}{{ ID }}', generator);

      // then
      expect(replaced).to.eql('012');
    });


    it('should support object style', function() {

      // given
      const generator = {
        id: 0,
        next() {
          return this.id++;
        }
      };

      // when
      const replaced = replaceIds('{{ ID }}{{ ID }}{{ ID }}', generator);

      // then
      expect(replaced).to.eql('012');
    });


    it('should throw on unsupported', function() {

      expect(function() {
        replaceIds('{{ ID }}', {});
      }).to.throw('unsupported generator');

    });

  });

});