import { getAllFiles, getAllVars, renderTpl } from './utils';

test('getAllFiles', () => {
  const files = getAllFiles('./templates');
  console.log(files);
});

test('getAllVars', () => {
  const tpl = `
    qwdpoqwkdpqw
    dqwdqw
    dqwdqwdqwd
    {{name}}
    ewefwefpowkepofkwpeof
    wefwef{{name}}
    oqiwjdoqiwd{{age}}qwjdoqijw
    `;

  const vars = getAllVars(tpl);
  expect(vars).toEqual(['name', 'age']);
});

test('renderTpl', () => {
  const tpl = `
    qwdpoqwkdpqw
    dqwdqw
    dqwdqwdqwd
    {{name}}
    ewefwefpowkepofkwpeof
    wefwef{{name}}
    oqiwjdoqiwd{{age}}qwjdo{{age}}{{name}}qijw
    `;

  const data = {
    name: 'Bill Murrey',
    age: 43
  }

  const r = renderTpl(tpl, data);
  expect(r).toEqual(`
    qwdpoqwkdpqw
    dqwdqw
    dqwdqwdqwd
    Bill Murrey
    ewefwefpowkepofkwpeof
    wefwefBill Murrey
    oqiwjdoqiwd43qwjdo43Bill Murreyqijw
    `);
});