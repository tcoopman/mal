class Reader {
  constructor(tokens) {
    this.tokens = tokens;
    this._position = 0;
  }

  next() {
    const next = this.peek();
    this._position += 1;
    return next;
  }

  peek() {
    return this.tokens[this._position];
  }
}


function tokenizer(input) {
  const regex = /[\s,]*(~@|[\[\]{}()'`~^@]|"(?:\\.|[^\\"])*"|;.*|[^\s\[\]{}('"`,;)]*)/g;
  let tokens = [];
  let token;
  while ((token = regex.exec(input))[1] !== '') {
    tokens.push(token[0].trim());
  }
  return tokens;
}


function read_form(reader) {
  const token = reader.peek();
  if (token === '(') {
    return read_list(reader);
  } else {
    return read_atom(reader);
  }
}


function read_list(reader) {
  const result = [];
  let token = reader.next();
  let maxLoop = 10;
  while (reader.peek() !== ')' && maxLoop >0) {
    result.push(read_form(reader));
    maxLoop--;
    token = reader.next();
  }
  return result;
}


function read_atom(reader) {
  const token = reader.peek();
  const numberRegex = /^\d+$/;
  const tokenRegex = /^[\+\-\*\/]$/;
  if (token === 'nil') {
    return {type: 'Nil'};
  } else if (token === 'false') {
    return {type: 'Bool', value: false};
  } else if (token === 'true') {
    return {type: 'Bool', value: true};
  } else if (numberRegex.test(token)) {
    return {type: 'Int', value: token};
  } else if (tokenRegex.test(token)) {
    return {type: 'Sym', value: token};
  } else {
    return {type: 'String', value: token};
  }
}


export function read_str(input) {
  const tokens = tokenizer(input);
  const reader = new Reader(tokens);
  return read_form(reader);
}
