/* @flow */
import readline from 'readline';

import {read_str} from './reader';
import {pr_str} from './printer';


function READ(input) {
  return read_str(input);
}


function EVAL(string) {
  return string;
}


function PRINT(malStructure) {
  return pr_str(malStructure);
}


function rep(input) {
  const readInput = READ(input);
  const evaluation = EVAL(readInput);
  const output = PRINT(evaluation);
  return output;
}


function main() {
  const rl = readline.createInterface(process.stdin, process.stdout);
  rl.setPrompt('jsmal> ');
  rl.prompt();

  rl.on('line', line => {
    const output = rep(line);
    console.log(output);
    rl.prompt();
  });

  rl.on('close', () => {
    console.log('Exiting');
    return;
  });
}

main();
