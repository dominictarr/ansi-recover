//I don't know how this stuff works, I got it by
//piping running vim | tee log
//and then carefully experimenting with the codes at the start and end.
//I can't find documentation on these obscure codes anywhere...

module.exports = function (opts) {
  opts = opts || {}
  var start = [
      '\u001b[?1049h', //clear the screen from previous usage
      '\u001b[?12l',   //this is needed to clear the terminal
      '\u001b[H',      //move cursor to the top left
      //hide cursor, but only if we have a TTY,
      //because otherwise it doesn't seem to come back
      process.stdout.isTTY && opts.cursor === false ? '\u001b[?25l' : '',
  ].join('')

  var exit = '\u001b[?1049l' //recover the initial screen

  process.stdout.write(start)

  function show () {
    process.stdout.write('\u001b[0m')   //plain, non coloured terminal.
    //very strange. this only works if it's in a separate write call to the final code
    if(opts.cursor === false)
      process.stdout.write('\u001b[?25h') //show cursor
    process.stdout.write(exit)
    process.exit()
  }

  process
    .on('exit', show)
    .on('SIGINT', show)
    .on('SIGTERM', show)

}
