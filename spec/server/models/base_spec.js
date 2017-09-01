describe('Base', () => {
  const Base = require('./../../../server/models/base');
  const obj = {
    attr1: 'abcde',
    attr2: 12345
  };
  var base;

  beforeEach(() => {
    base = new Base();
  });

  it('match a string and add parsed into class attributes', () => {
    const str = 'simple string with number';
    const rgx = /simple (\S+) with (\S+)/;
    const map = {
      1: 'model',
      2: 'operator'
    };

    base.matchAndMap(str, rgx, map);

    expect(base.attributes).toEqual({
      model: 'string',
      operator: 'number'
    });
  });

  describe('getting an attribute', () => {
    beforeEach(() => {
      base.attributes = Object.assign({}, obj);
    });

    it('retrieve a specific content of attributes from name', () => {
      Object.keys(obj).forEach((key) => {
        expect(base.get(key)).toEqual(obj[key]);
      });
    });

    it('try retrieve an invalid attribute', () => {
      expect(base.get('invalidKey')).toEqual(null);
    });
  });

  describe('converting to object', () => {
    beforeEach(() => {
      base.attributes = Object.assign({}, obj);
    });

    it('convert to plain/object', () => {
      expect(base.toObject()).toEqual(obj);
    });

    it('generate a custom object', () => {
      const obj2 = {another: 'value'};
      spyOn(base, 'customItems').and.returnValue(obj2);
      expect(base.toObject()).toEqual(jasmine.objectContaining(obj2));
    });
  });
});
