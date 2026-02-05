// ======================
// AST DE TESTE (BASE)
// ======================
const projectAST = {
  events: [
    {
      type: "event_start",
      blocks: []
    }
  ]
};

// ======================
// VM
// ======================
const VM_COMMANDS = {
  move_steps(block) {
    console.log("mover", block.steps);
  },

  repeat(block) {
    console.log("repetir", block.times, "vezes");
    for (let i = 0; i < block.times; i++) {
      runBlocks(block.blocks);
    }
  }
};

function runBlocks(blocks) {
  for (const block of blocks) {
    const command = VM_COMMANDS[block.type];
    if (command) {
      command(block);
    } else {
      console.warn("Bloco desconhecido:", block.type);
    }
  }
}

function runProject(ast) {
  for (const event of ast.events) {
    if (event.type === "event_start") {
      console.log("[EVENTO] início");
      runBlocks(event.blocks);
    }
  }
}

// ======================
// EDITOR DE BLOCOS (UI)
// ======================
const blocksContainer = document.getElementById("blocks");
const uiBlocks = [];

function createMoveBlock() {
  const block = {
    type: "move_steps",
    params: { steps: 10 },
    blocks: []
  };

  uiBlocks.push(block);

  const el = document.createElement("div");
  el.textContent = "Mover 10 passos";
  el.style.border = "1px solid black";
  el.style.margin = "4px";
  el.style.padding = "4px";

  blocksContainer.appendChild(el);
}

function createRepeatBlock() {
  const block = {
    type: "repeat",
    params: { times: 3 },
    blocks: []
  };

  uiBlocks.push(block);

  const el = document.createElement("div");
  el.textContent = "Repetir 3 vezes";
  el.style.border = "1px solid black";
  el.style.margin = "4px";
  el.style.padding = "4px";

  blocksContainer.appendChild(el);
}

document.getElementById("addMove").onclick = createMoveBlock;
document.getElementById("addRepeat").onclick = createRepeatBlock;

document.getElementById("run").onclick = () => {
  projectAST.events[0].blocks = uiBlocks.map(b => {
    if (b.type === "move_steps") {
      return {
        type: "move_steps",
        steps: b.params.steps
      };
    }

    if (b.type === "repeat") {
      return {
        type: "repeat",
        times: b.params.times,
        blocks: []
      };
    }
  });

  console.log("AST GERADO:", projectAST);
  runProject(projectAST);
};
