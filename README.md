# ansi-recover

recover from a full terminal ui app, back to the terminal on exit,
like vim or man pages.

``` js
require('ansi-recover')({cursor: visible})
```

`visible` should be false if you would
like to not show the cursor in your app.
the cursor will be redisplayed on exit.


## License

MIT
