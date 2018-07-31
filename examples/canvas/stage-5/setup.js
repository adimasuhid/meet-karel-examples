// Stage 5
(function () {
  function randomInt(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
  }

  let eventLoop = new Karel.EventLoop({ speed: 500 })
  let boulderCoords = [
    { x: randomInt(1, 13), y: randomInt(1, 8) },
  ]

  let wallCoords = [
    { x: randomInt(1, 13), y: randomInt(1, 8) },
    { x: randomInt(1, 13), y: randomInt(1, 8) },
    { x: randomInt(1, 13), y: randomInt(1, 8) },
    { x: randomInt(1, 13), y: randomInt(1, 8) },
    { x: randomInt(1, 13), y: randomInt(1, 8) },
    { x: randomInt(1, 13), y: randomInt(1, 8) },
    { x: randomInt(1, 13), y: randomInt(1, 8) },
    { x: randomInt(1, 13), y: randomInt(1, 8) },
    { x: randomInt(1, 13), y: randomInt(1, 8) },
    { x: randomInt(1, 13), y: randomInt(1, 8) },
  ]
  let board = new Karel.Board({ width: 15, height: 10, boulders: boulderCoords, walls: wallCoords })
  let resolver = new Karel.Resolver({ board: board })
  let renderer = new Karel.Canvas({ board: board })
  window.game = new Karel.Game({ resolver: resolver, eventLoop: eventLoop, renderer: renderer })

  window.game.attach(document.getElementById('game'))
  window.game.addAssetSource(document.getElementById('asset-source'))

  window.editor = ace.edit("editor")
  window.editor.setTheme("ace/theme/monokai")
  window.editor.session.setMode("ace/mode/javascript")

  document.getElementById("run").addEventListener("click", function () {
    try {
      window.game.resolve(function () {
        eval(window.editor.getValue())
      })
    } catch (e) {
      alert(e.message) 
    }
  });

  document.getElementById("reset").addEventListener("click", function () {
    window.game.reset()
  })

  window.game.render()
})()
