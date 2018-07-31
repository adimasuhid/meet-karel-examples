// Stage 3
(function () {
  let eventLoop = new Karel.EventLoop({ speed: 500 })
  let boulderCoords = [{ x: 6, y: 5 }, { x: 1, y: 8 }, { x: 12, y: 3 }]
  let wallCoords = [
    { x: 7, y: 5 }, { x: 6, y: 4 }, { x: 1, y: 7 }, 
    { x: 2, y: 7 }, { x: 12, y: 2 }, { x: 12, y: 4 },
    { x: 11, y: 2 }, { x: 11, y: 3 }, { x: 11, y: 4 },
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
