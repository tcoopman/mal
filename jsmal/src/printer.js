export function pr_str(mal) {
  let result = '';
  if (Array.isArray(mal)) {
    const strings = mal.map(m => pr_str(m));
    result += '(' + strings.join(' ') + ')';
  } else if (mal.type === 'Int' || mal.type === 'String' || mal.type === 'Bool' || mal.type === 'Sym') {
    result += mal.value;
  } else if (mal.type === 'Nil') {
    result += 'nil';
  }
  return result;
}
