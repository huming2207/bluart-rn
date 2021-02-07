export const WebViewHtml = `
<!doctype html>
<html>
<head>
    <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/xterm@4.10.0/css/xterm.css" integrity="sha256-QIY4PCy8QFMjISW7DEmeaROMHswpbJfnbLPUH3/GHxw=" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/xterm@4.10.0/lib/xterm.js" integrity="sha256-3GfHeMjl/2I8JX8oZfrD6E30+LBaMEjawShQPXKGnaY=" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/xterm-addon-fit@0.5.0/lib/xterm-addon-fit.js" integrity="sha256-8SDYHHm4Bpu8Ni+b8Yb4ckmAocIa+zRg94HpTm2wa9E=" crossorigin="anonymous"></script>
</head>
<body>
    <div id="terminal" style="height: 99vh"></div>
    <script>
    var term = new Terminal();
    var fitAddon = new FitAddon.FitAddon();
    term.loadAddon(fitAddon);
    term.setOption('fontSize', 15)
    term.open(document.getElementById('terminal'));
    term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')

    fitAddon.fit();
    console.log(fitAddon.proposeDimensions())
    </script>
</body>
</html>
`;
