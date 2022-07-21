export const getAllVars = (str: string) => {
  const result = Array.from(str.matchAll(/{{(\w+)}}/g)).map(i => i[1]);
  return [...new Set(result)]; // return distinct
}

export const renderTpl = (tpl: string, data: Record<string, any>) => {
  const vars = getAllVars(tpl);
  let result = tpl;
  vars.forEach(variable => {
    const value = data[variable];
    if (value !== undefined) {
      const rx = new RegExp(`{{${variable}}}`, 'g');
      result = result.replace(rx, value);
    }
  });
  return result;
}
