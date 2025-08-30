import test from 'node:test';
import assert from 'node:assert/strict';
import { labelFor } from '../scale.js';

test('type-specific scale overrides', () => {
  const global = {1:'',2:'',3:'',4:'',5:'',6:'',7:'G7',8:'',9:'',10:''};
  const settings = { ['smärtskala']: global };
  assert.equal(labelFor(settings,'magont',7), 'G7');
  assert.equal(labelFor(settings,'livmoder-ont',7), 'G7');
  settings['smärtskala_magont'] = { ...global, 7: 'M7' };
  assert.equal(labelFor(settings,'magont',7), 'M7');
  assert.equal(labelFor(settings,'livmoder-ont',7), 'G7');
  delete settings['smärtskala_magont'];
  assert.equal(labelFor(settings,'magont',7), 'G7');
});
