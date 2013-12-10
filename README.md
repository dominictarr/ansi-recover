# ansi-recover

recover from a full terminal ui app, back to the terminal on exit,
like vim or man pages.

``` js
require('ansi-recover')({cursor: visible, mouse: enable})
```

`visible` should be false if you would
like to not show the cursor in your app.
the cursor will be redisplayed on exit.

`{mouse: enable}` turns on mouse sequences.

## License

MIT
