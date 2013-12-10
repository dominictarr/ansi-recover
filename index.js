//I don't know how this stuff works, I got it by
//piping running vim | tee log
//and then carefully experimenting with the codes at the start and end.
//I can't find documentation on these obscure codes anywhere...

module.exports = function (opts) {
  opts = opts || {}
  var start = [
      '\x1b[?1049h', //clear the screen from previous usage
      '\x1b[?12l',   //this is needed to clear the terminal
      '\x1b[H',      //move cursor to the top left
      //hide cursor, but only if we have a TTY,
      //because otherwise it doesn't seem to come back
      process.stdout.isTTY && opts.cursor === false ? '\x1b[?25l' : '',
      opts.mouse ? '\x1b[?1000h' : ''
  ].join('')

  var exit = '\u001b[?1049l' //recover the initial screen

  process.stdout.write(start)

  var processExit = process.exit

  var exited = false
  function show () {
    if(!exited) {
      exited = true
      process.stdout.write('\u001b[0m')   //plain, non coloured terminal.
      //very strange. this only works if it's in a separate write call to the final code
      if(opts.cursor === false)
        process.stdout.write('\u001b[?25h') //show cursor

      if(opts.mouse)
        process.stdout.write('\x1b[?1000l')

      process.stdout.write(exit)
    }
    setTimeout(function () {
      processExit.call(process)
    }, 50)
  }

  process.exit = show

  process
    .on('exit', show)
    .on('SIGINT', show)
    .on('SIGTERM', show)

}
