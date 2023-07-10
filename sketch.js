let jogadorX = 900;
let limite = 900;
let teleport = false;
let jogadorY = 900;
let velJogador = 7;
let velSol = 1;
let estrela = false;
let jogadorPisca = false;
let intervaloSol = false;
let obstaculos = []; // Array para armazenar os obstáculos
let poderes = []; // Array para armazenar os poderes
let velocidadePoder;
let xstar, ystar;
let imagemFundo;
let yFundo1 = 0;
let yFundo2;
let estado = 0;
let transicao = 0;
let life = 6;
let musicaPlay = false;
let musicaOn = true;
let somGOverPlay = false;
let anguloEstrela = 0;
let anguloSol = 0;
let fonte;
let pontuacao = 0;
let xsol;
let ysol = -1025;
let colisao = true;

function preload() {
  imagemFundo = loadImage('fundomenu.png');
  imagemFundo1 = loadImage('ursa.png');
  imagemFundo2 = loadImage('cruzeiro.png');
  imagemFundo3 = loadImage('orion.png');
  imagemFundo4 = loadImage('scorpion.png');
  imagemFundo5 = loadImage('cisne.png');
  imagemTiro = loadImage('tiro.png');
  imagemTitulo = loadImage('guardian5.png');
  titulo = loadImage('fundomenu.png');
  imagemInicio = loadImage('inicio.png');
  imagemFim = loadImage('finalizacao.png');
  imagemControles = loadImage('controles1.png');
  imagemControles2 = loadImage('controles2.png');
  imagemCreditos = loadImage('creditos.png');
  imagemLevels = loadImage('selection.png');
  imagemObstaculo = loadImage('inimigo2.png');
  imagemJogador = loadImage('nave3.png');
  imagemEstrela = loadImage('estrela2.png');
  imagemObstaculo2 = loadImage('fogo3.png');
  imagemSol = loadImage('sol.png');
  imagemGOver = loadImage('gameover.png');
  imagemBatalha = loadImage('batalha.png');
  imagemMission1 = loadImage('mission1.png');
  imagemMission2 = loadImage('mission2.png');
  imagemMission3 = loadImage('mission3.png');
  imagemMission4 = loadImage('mission4.png');
  imagemMission5 = loadImage('mission5.png');
  imagemMission6 = loadImage('mission6.png');
  imagemUrsa = loadImage('ursatela.png');
  imagemCruzeiro = loadImage('cruzeirotela.png');
  imagemOrion = loadImage('oriontela.png');
  imagemScorpion = loadImage('scorpiontela.png');
  imagemCisne = loadImage('cisnetela.png');
  imagemSom = loadImage('musicaicon.png');
  imagemOff = loadImage('musicaoff.png');
  telaSol = loadImage('soltela.png');
  musicaFase1 = loadSound('musica2.mp3');
  musicaFase2 = loadSound('musica4.mp3');
  musicaFase3 = loadSound('musica3.mp3');
  musicaSuspense = loadSound('musicamenu.mp3');
  somTiro = loadSound('tiro3.mp3');
  somWin = loadSound('victory.mp3');
  somInimigo = loadSound('ouch.mp3');
  somEstrela = loadSound('star2.mp3');
  somGOver = loadSound('game_over.mp3');
  somDeath = loadSound('death2.mp3');
  teleporte = loadSound('teleporte.mp3');
}

function menu() {
  clear();
  if(!musicaPlay) {
    musicaSuspense.loop();
    musicaPlay = true;
  }
  life = 6;
  ysol = -1275;
  teleport = false;
  jogadorY = 900;
  velJogador = 12;
  velSol = 1;
  anguloSol = 0;
  stopMusic();
  somGOverPlay = false;
  botaoVolta.hide();
  botaoNext.hide();
  botao1.hide();
  botao2.hide();
  botao3.hide();
  botao4.hide();
  botao5.hide();
  botao6.hide();
  botaoMusica.show();
  obstaculos.splice(0, obstaculos.length);
  poderes.splice(0, poderes.length);
  background(titulo);
  image(imagemTitulo, width/2-200, 30, 400, 300);
  if(musicaOn) {
    image(imagemSom, 20, height-100, 80,80);  
  } else if(!musicaOn) {
    image(imagemOff, 20, height-100, 80,80); 
  }
  
  // Desenha o título "STELLAR GUARDIAN"
  fill(255, 192, 203);
  textStyle(BOLD);
  fill('pink');
  stroke('white');
  strokeWeight(4);
  textSize(75);
  textAlign(CENTER, TOP);
  textFont("Comic Sans");
  //text("STELLAR GUARDIAN", width / 2, 50);
}

function mouseClicked() {
  if(estado==0) {
    if(!musicaPlay) {
    musicaSuspense.loop();
    musicaPlay = true;
    }
  }
}

function controles() {
  clear();
  botaoMusica.hide();
  botaoVolta.show();
  background(imagemControles)
  if(keyIsDown(ESCAPE)) {
    estado=0;
    mostrarBotao();
  }
}

function creditos() {
  clear();
  botaoMusica.hide();
  botaoVolta.show();
  background(imagemCreditos)
  if(keyIsDown(ESCAPE)) {
    estado=0;
    mostrarBotao();
  }
}

function levels() {
  clear();
  botaoMusica.hide();
  botaoVolta.show();
  background(imagemLevels);
  keyPressed();
  botao1.show();
  botao2.show();
  botao3.show();
  botao4.show();
  botao5.show();
  botao6.show();
  if(keyIsDown(ESCAPE)) {
    estado=0;
    mostrarBotao();
  }
}

function gover() {
  clear();
  botaoNext.show();
  obstaculos.splice(0, obstaculos.length);
  poderes.splice(0, poderes.length);
  musicaFase1.stop();
  musicaFase2.stop();
  musicaFase3.stop();
  teleporte.stop();
  somTiro.stop();
  life = 3;
  musicaPlay = false;
  xstar = random(70, width-70);
  ystar = -70;
  background(imagemGOver);
  if (!musicaPlay && !somGOverPlay) {
    somGOver.play();
    somGOverPlay = true; 
  }
}

function setup() {
  let canvasY = windowWidth/2-500;
  canvas = createCanvas(1000, 800);
  canvas.position(canvasY, 0);
  jogadorX = width/2-80;
  yFundo2 = -height;
  xsol = -125;
  velocidadePoder = 12;
  xstar = random(70, width-70);
  ystar = -70;
  musicaPlay = false;
  musicaFase3.setVolume(0.2);
  musicaFase2.setVolume(0.2);
  musicaFase1.setVolume(0.2);
  somGOver.setVolume(0.3);
  somDeath.setVolume(0.1);
  somTiro.setVolume(0.1);
  somEstrela.setVolume(0.1);
  teleporte.setVolume(4);
  musicaSuspense.setVolume(0.1);
  somInimigo.setVolume(0.3);
  // Criar os botões
  botaoJogar = createButton("ARCADE");
  botaoJogar.style('font-family', 'Comic Sans MS');
  botaoJogar.style("font-weight", "bold");
  botaoJogar.position(canvasY+350, height/2-50);
  botaoJogar.size(300,75);
  botaoJogar.style('font-size', '50px');
  botaoJogar.style('border-radius', '50px');
  botaoJogar.mouseOver(mudaCor);
  botaoJogar.mouseOut(mudarCorOriginal);
  botaoJogar.mousePressed(acaoJogar);
  
  botaoNext = createButton("");
  botaoNext.style('font-family', 'Comic Sans MS');
  botaoNext.style("font-weight", "bold");
  botaoNext.position(canvasY+865, height-125);
  botaoNext.size(90,90);
  botaoNext.style('opacity', '0');
  botaoNext.style('border-radius', '50px');
  botaoNext.mouseClicked(avancar);
  
  botaoVolta = createButton("");
  botaoVolta.style('font-family', 'Comic Sans MS');
  botaoVolta.style("font-weight", "bold");
  botaoVolta.position(canvasY+50, height-125);
  botaoVolta.size(90,90);
  botaoVolta.style('opacity', '0');
  botaoVolta.style('border-radius', '50px');
  botaoVolta.mouseClicked(voltar);
  
  botaoLevels = createButton("NÍVEIS");
  botaoLevels.style('font-family', 'Comic Sans MS');
  botaoLevels.style("font-weight", "bold");
  botaoLevels.position(canvasY+350, height/2+40);
  botaoLevels.size(300,75);
  botaoLevels.style('font-size', '50px');
  botaoLevels.style('border-radius', '50px');
  botaoLevels.mouseOver(mudaCor);
  botaoLevels.mouseOut(mudarCorOriginal);
  botaoLevels.mousePressed(acaoLevels);
   
  botaoInstrucoes = createButton("INSTRUÇÕES");
  botaoInstrucoes.style('font-family', 'Comic Sans MS');
  botaoInstrucoes.style("font-weight", "bold");
  botaoInstrucoes.position(canvasY+350, height/2+130);
  botaoInstrucoes.size(300,75);
  botaoInstrucoes.style('font-size', '35px');
  botaoInstrucoes.style('border-radius', '50px');
  botaoInstrucoes.mouseOver(mudaCor2);
  botaoInstrucoes.mouseOut(mudarCorOriginal2);
  botaoInstrucoes.mousePressed(acaoInstrucoes);
  
  botaoCreditos = createButton("CRÉDITOS");
  botaoCreditos.style('font-family', 'Comic Sans MS');
  botaoCreditos.style("font-weight", "bold");
  botaoCreditos.position(canvasY+350, height/2+220);
  botaoCreditos.size(300,75);
  botaoCreditos.style('font-size', '50px');
  botaoCreditos.style('border-radius', '50px');
  botaoCreditos.mouseOver(mudaCor);
  botaoCreditos.mouseOut(mudarCorOriginal);
  botaoCreditos.mousePressed(acaoCreditos);
  
  botao1 = createButton("");
  botao1.size(130,130);
  botao1.position(canvasY+58, height/2-130);
  botao1.style('opacity', '0');
  botao1.mouseClicked(primeiro);
  
  botao2 = createButton("");
  botao2.size(130,130);
  botao2.position(canvasY+250, height/2-130);
  botao2.style('opacity', '0');
  botao2.mouseClicked(segundo);
  
  botao3 = createButton("");
  botao3.size(130,130);
  botao3.position(canvasY+435, height/2-130);
  botao3.style('opacity', '0');
  botao3.mouseClicked(terceiro);
  
  botao4 = createButton("");
  botao4.size(130,130);
  botao4.position(canvasY+620, height/2-130);
  botao4.style('opacity', '0');
  botao4.mouseClicked(quarto);
  
  botao5 = createButton("");
  botao5.size(130,130);
  botao5.position(canvasY+810, height/2-130);
  botao5.style('opacity', '0');
  botao5.mouseClicked(quinto);
  
  botao6 = createButton("");
  botao6.size(130,130);
  botao6.position(canvasY+435, height/2+65);
  botao6.style('opacity', '0');
  botao6.mouseClicked(sexto);
  
  botaoMusica = createButton("");
  botaoMusica.size(80,80);
  botaoMusica.position(canvasY+20, height-100);
  botaoMusica.style('opacity', '0');
  botaoMusica.mouseClicked(musica);
}

function avancar() {
  if(estado==24) {
    estado=25;
  }else if(estado==25) {
    estado=10;
  } else if(estado==10) {
    musicaSuspense.stop();
    musicaPlay = false;
    estado=1; 
  } else if(estado==11) {
    estado=12; 
  } else if(estado==12) {
    musicaSuspense.stop();
    musicaPlay = false;
    estado=5; 
  } else if(estado==13) {
    estado=14; 
  }else if(estado==14) {
    musicaSuspense.stop();
    musicaPlay = false;
    estado=6; 
  } else if(estado==15) {
    estado=16; 
  } else if(estado==16) {
    musicaSuspense.stop();
    musicaPlay = false;
    estado=7; 
  } else if(estado==17) {
    estado=18; 
  } else if(estado==18) {
    musicaSuspense.stop();
    musicaPlay = false;
    estado=8; 
  } else if(estado==19) {
    estado=27; 
  } else if(estado==27) {
    estado=20;   
  } else if(estado==20) {
    musicaSuspense.stop();
    musicaPlay = false;
    estado=9; 
  } else if(estado==21) {
    estado=26;
    somWin.play();
  } else if(estado==26) {
    estado=0;
    botaoJogar.show();
    botaoLevels.show();
    botaoInstrucoes.show();
    botaoCreditos.show();
  } else if (estado==4) {
    estado = 0;
    mostrarBotao();
    resetarFase();
    somGOverPlay = false;
    musicaPlay = false;         
  }
}

function iniciar2() {
  clear();
  background(imagemInicio); 
  botaoNext.show();
  obstaculos.splice(0, obstaculos.length);
  poderes.splice(0, poderes.length); 
}

function voltar() {
  if(estado==2 || estado==3 || estado==22 ||estado==24)  {
    estado = 0;
    botaoJogar.show();
    botaoInstrucoes.show();
    botaoCreditos.show();
    botaoLevels.show();
  } 
}

function iniciar() {
  clear();
  background(imagemControles2); 
  botaoMusica.hide();
  botaoNext.show();
  botaoVolta.show();
  obstaculos.splice(0, obstaculos.length);
  poderes.splice(0, poderes.length);  
}

function final() {
  clear();
  background(imagemFim); 
  botaoNext.show();
  musicaPlay = false;
  obstaculos.splice(0, obstaculos.length);
  poderes.splice(0, poderes.length);  
}

function batalha() {
  clear();
  background(imagemBatalha); 
  botaoNext.show();
  musicaPlay = false;
  obstaculos.splice(0, obstaculos.length);
  poderes.splice(0, poderes.length);  
}

function primeiro() {
  estado=10;
  botao1.hide();
  botao2.hide();
  botao3.hide();
  botao4.hide();
  botao5.hide();
  botao6.hide();
}
function segundo() {
  estado=12;
  botao1.hide();
  botao2.hide();
  botao3.hide();
  botao4.hide();
  botao5.hide();
  botao6.hide();
}
function terceiro() {
  estado=14;
  botao1.hide();
  botao2.hide();
  botao3.hide();
  botao4.hide();
  botao5.hide();
  botao6.hide();
}
function quarto() {
  estado=16;
  botao1.hide();
  botao2.hide();
  botao3.hide();
  botao4.hide();
  botao5.hide();
  botao6.hide();
}
function quinto() {
  estado=18;
  botao1.hide();
  botao2.hide();
  botao3.hide();
  botao4.hide();
  botao5.hide();
  botao6.hide();
}
function sexto() {
  estado=20;
  botao1.hide();
  botao2.hide();
  botao3.hide();
  botao4.hide();
  botao5.hide();
  botao6.hide();
}
function musica() {
  if(musicaOn) {
    musicaFase3.setVolume(0);
    musicaFase2.setVolume(0);
    musicaFase1.setVolume(0);
    somGOver.setVolume(0);
    somDeath.setVolume(0);
    somTiro.setVolume(0);
    somEstrela.setVolume(0);
    musicaSuspense.setVolume(0);
    teleporte.setVolume(0);
    somInimigo.setVolume(0);
    musicaOn = false;
  } else if (!musicaOn) {
    musicaFase3.setVolume(0.2);
    musicaFase2.setVolume(0.2);
    musicaFase1.setVolume(0.2);
    somGOver.setVolume(0.3);
    somDeath.setVolume(0.1);
    somTiro.setVolume(0.1);
    somEstrela.setVolume(0.1);
    teleporte.setVolume(4);
    musicaSuspense.setVolume(0.1);
    somInimigo.setVolume(0.3);
    musicaOn = true;
  }
}

function draw() {
  background(0);
  if(estado==0) {
    //stopMusic()
    menu();
  }
  if(estado==1) {
    clear();
    fase1();
  }
  if(estado==2) {
    controles();
  }
  if(estado==3) {
    creditos();
  }
  if(estado==4) {
    stopMusic();
    gover();
  }
  if(estado==5) {
    clear();
    fase2();
  }
  if(estado==6) {
    clear();
    fase3();
  }
  if(estado==7) {
    clear();
    fase4();
  }
  if(estado==8) {
    clear();
    fase5();
  }
  if(estado==9) {
    clear();
    fase6();
  }
  if(estado==10) {
    stopMusic();
    mission1();
  }
  if(estado==11) {
    stopMusic();
    ursaTela();
  }
  if(estado==12) {
    stopMusic();
    mission2();
  }
  if(estado==13) {
    stopMusic();
    cruzeiroTela();
  }   
  if(estado==14) {
    stopMusic();
    mission3();
  } 
  if(estado==15) {
    stopMusic();
    orionTela();
  } 
  if(estado==16) {
    somTiro.stop();
    mission4();
  } 
  if(estado==17) {
    stopMusic();
    scorpionTela();
  } 
  if(estado==18) {
    stopMusic();
    mission5();
  } 
  if(estado==19) {
    stopMusic();
    cisneTela();
  } 
  if(estado==20) {
    stopMusic();
    mission6();
  } 
  if(estado==21) {
    stopMusic();
    solTela();
  } 
  if(estado==22) {
    levels();
  } 
  if(estado==24) {
    iniciar();
  } 
  if(estado==25) {
    iniciar2();
  } 
  if(estado==26) {
    final();
  } 
  if(estado==27) {
    batalha();
  }
}

//Menu

function acaoJogar() {
  clear();
  esconderBotao();
  estado=24;
}

function acaoInstrucoes() {
  clear();
  esconderBotao()
  estado = 2;
}

function acaoCreditos() {
  clear();
  esconderBotao()
  estado = 3;
}

function acaoLevels() {
  clear();
  esconderBotao()
  estado = 22;
}

function mudaCor() {
  this.style('background-color', '#ff91b7');
  this.style('font-size', '53px');
  this.style('color', 'white');
  this.style('text-shadow', '5px 1px 2px black');
}

function mudarCorOriginal() {
  this.style('background-color', '');
  this.style('font-size', '50px')
  this.style('color', '');
  this.style('text-shadow', '');
}

function mudaCor2() {
  this.style('background-color', '#ff91b7');
  this.style('font-size', '40px');
  this.style('color', 'white');
  this.style('text-shadow', '5px 1px 2px black');
}

function mudarCorOriginal2() {
  this.style('background-color', '');
  this.style('font-size', '35px')
  this.style('color', '');
  this.style('text-shadow', '');
}

function mostrarBotao() {
  botaoJogar.show();
  botaoInstrucoes.show();
  botaoCreditos.show();
  botaoLevels.show();
}

function esconderBotao() {
  botaoJogar.hide();
  botaoInstrucoes.hide();
  botaoCreditos.hide();
  botaoLevels.hide();
}

//Jogabilidade 

function jogador() {
  jogadorX = constrain(jogadorX, 10, width-80)
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    jogadorX += 8;
  }
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    jogadorX -= 8;
  } 
  if (!jogadorPisca || frameCount %10===0) {
    image(imagemJogador, jogadorX, jogadorY, 70, 120);
  }
}

function jogador2() {
  jogadorX = constrain(jogadorX, 0, limite)
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    jogadorX += 12;
  }
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    jogadorX -= 12;
  } 
    if (!jogadorPisca || frameCount %10===0) {
    image(imagemJogador, jogadorX, jogadorY, 50, 100);
  }
}

function jogador3() {
  jogadorX = constrain(jogadorX, 0, limite)
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    jogadorX += 10;
  }
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    jogadorX -= 10;
  } 
    if (!jogadorPisca || frameCount %10===0) {
    image(imagemJogador, jogadorX, jogadorY, 70, 120);
  }
}

//function mouseMoved() {
 // jogadorX = mouseX;
  // Limita a posição do jogador dentro dos limites da tela
//  jogadorX = constrain(jogadorX, 0, limite);
//}

function exibirFundo() {
  image(imagemFundo, 0, yFundo1, width, height);
  image(imagemFundo, 0, yFundo2, width, height);
  yFundo1 += 0.5;
  yFundo2 += 0.5;
  if (yFundo1 >= height) {
    yFundo1 = -height;
  }
  if (yFundo2 >= height) {
    yFundo2 = -height;
  }
}

function keyPressed() {
  if (key === ' ') {
    let poder = { x:jogadorX, y:jogadorY-55, imagem: imagemTiro};
    poderes.push(poder);
    somTiro.play();
  }
  if(estado==22) {
    if(key === '1') {
      estado=10;
    } if(key==='2') {
      estado=12;
    } if(key==='3') {
      estado=14;
    } if(key==='4') {
      estado=16;
    } if(key==='5') {
      estado=18;
    } if(key==='6') {
      estado=20;
    }
  }
}

function desenharPoderes() {
  for (let i = poderes.length - 1; i >= 0; i--) {
    let poder = poderes[i];
    image(imagemTiro, poder.x+18, poder.y-5, 40, 100);
    poder.y -= velocidadePoder;
    if (poder.y > height) {
        poderes.splice(i, 1);
    }
  }
}

function desenharPontuacao() {
  fill(255);
  textAlign(RIGHT); 
  fill('#f9bb19');
  stroke('#5532d1');
  strokeWeight(4);
  textFont("Comic Sans");
  textSize(70);
  text('★ : ' + pontuacao, width - 10, 10);
}

function criarObstaculos() {
  if(frameCount%30===0) {  //Aumenta a quantidade de inimigos
    let obstaculoX = random(0, width-100); 
    let obstaculoY = -80;
    obstaculos.push({x: obstaculoX, y: obstaculoY});
  }
  for (let i = obstaculos.length - 1; i >= 0; i--) {
    let obstaculo = obstaculos[i];
    image(imagemObstaculo, obstaculo.x, obstaculo.y, 100, 100);
    obstaculo.y += 3;
    if (obstaculo.y > height) {
      obstaculos.splice(i, 1);
    }if (obstaculo.y < -80) {
    obstaculos.splice(i, 1); 
    }
  }
}

function criarEstrela() {
  ystar += 5;
  push();
  imageMode(CENTER); 
  translate(xstar, ystar); 
  rotate(anguloEstrela); 
  image(imagemEstrela, 0, 0, 80, 80); 
  pop();
  anguloEstrela += 0.05;
if (ystar > 870) {
  xstar = random(20, width-80);
  ystar = -80;
  }
}

function verificarColisaoEstrela() {
  //fill(255, 0, 0, 100); 
  //ellipse(jogadorX+35, jogadorY+55, 60, 100);
  //ellipse(xstar, ystar, 70);
  if (collideCircleCircle(xstar, ystar, 70, jogadorX+35, jogadorY+55, 60, 100)) {
    xstar = random(70, width-70);
    ystar = -70;
    somEstrela.play();
    pontuacao++;
  }
}

function verificarColisaoPoderes() {
  for (let i = poderes.length - 1; i >= 0; i--) {
    let poder = poderes[i];
    for (let j = obstaculos.length - 1; j >= 0; j--) {
      let obstaculo = obstaculos[j];
      //fill(255, 0, 0, 100); 
      //ellipse(obstaculo.x+50, obstaculo.y+50, 90);
      //ellipse(poder.x+40, poder.y+45, 50, 70);
      if (collideCircleCircle(obstaculo.x+50, obstaculo.y+50, 90, poder.x+40, poder.y+45, 50, 70)) {
        somInimigo.play();
        obstaculos.splice(j, 1);
        poderes.splice(i, 1);
        break;
      }
    }
  }
}

function colisaoF() {
  colisao = true;
}

function verificarColisaoInimigo() {
  for (let i = obstaculos.length - 1; i >= 0; i--) {
    let obstaculo = obstaculos[i];
    //fill(255, 0, 0, 100); 
    //ellipse(obstaculo.x+50, obstaculo.y+50, 90);
    //ellipse(jogadorX+35, jogadorY+55, 60, 100);
    if (colisao && collideCircleCircle(obstaculo.x+50, obstaculo.y+50, 90, jogadorX+35, jogadorY+55, 60, 100)) {
      colisao = false;
      colisaoFrame = frameCount;
      obstaculos.splice(i, 1);
      somDeath.play();
      life--;
      jogadorPisca = true;
      setTimeout(pararPisca, 600);
      setTimeout(colisaoF, 1000)
    }
  }
}

function resetarFase() {
  clear();
  obstaculos = [];
  //resetStar();
  poderes = [];
  xstar = random(70, width-70);
  ystar = -70;
  pontuacao = 0;
  yFundo1 = 0;
  yFundo2 = -height;
}

function stopMusic() {
  musicaFase1.stop();
  somTiro.stop();
  somInimigo.stop();
  somGOver.stop();
  somDeath.stop();
  musicaFase2.stop();
  musicaFase3.stop();
}

//Fase 1

function fase1() {
  jogadorY -= velJogador;
  if (jogadorY<=height-130) {
    velJogador = 0;
  }
  if(!musicaPlay) {
    teleporte.play();
    musicaFase1.loop();
    musicaPlay = true;
  }
  exibirFundo1();
  jogador();
  criarEstrela();
  criarObstaculos();
  desenharPoderes();
  barraLife();
  desenharPontuacao();
  verificarColisaoInimigo();
  verificarColisaoEstrela();
  verificarColisaoPoderes();
  if(pontuacao>=10) {
    estado=11;
    pontuacao=0;
    musicaPlay = false;
    musicaFase1.stop();
  }
  if(keyIsDown(ESCAPE)){
    clear();
    estado=0;
    mostrarBotao();
    resetarFase();
    musicaFase1.stop();
    musicaPlay = false;
  }
}

function exibirFundo1() {
  image(imagemFundo1, 0, yFundo1, width, height);
  image(imagemFundo1, 0, yFundo2, width, height);
  yFundo1 += 0.5;
  yFundo2 += 0.5;
  if (yFundo1 >= height) {
    yFundo1 = -height;
  }
  if (yFundo2 >= height) {
    yFundo2 = -height;
  }
}

//Fase 2

function fase2() {
  jogadorY -= velJogador;
  if (jogadorY<=height-130) {
    velJogador = 0;
  }
  if(!musicaPlay) {
    teleporte.play();
    musicaFase1.loop();
    musicaPlay = true;
  }
  exibirFundo2();
  jogador();
  criarObstaculos2();
  criarEstrela();
  desenharPoderes();
  barraLife();
  verificarColisaoInimigo();
  verificarColisaoEstrela();
  verificarColisaoPoderes();
  desenharPontuacao();
  if(pontuacao>=15) {
    estado=13;
    pontuacao=0;
    musicaPlay = false;
    musicaFase1.stop();
  }
  if(keyIsDown(ESCAPE)){
    estado=0;
    mostrarBotao();
    resetarFase();
    musicaFase1.stop();
    musicaPlay = false;
  }
}

function criarObstaculos2() {
  if(frameCount%25===0) {  //Aumenta a quantidade de inimigos
    let obstaculoX = random(0, width-100); 
    let obstaculoY = -80;
    obstaculos.push({x: obstaculoX, y: obstaculoY});
  }
  for (let i = obstaculos.length - 1; i >= 0; i--) {
    let obstaculo = obstaculos[i];
    image(imagemObstaculo, obstaculo.x, obstaculo.y, 100, 100);
    obstaculo.y += 4;
    if (obstaculo.y > height) {
      obstaculos.splice(i, 1);
    }
  }
}

function exibirFundo2() {
  image(imagemFundo2, 0, yFundo1, width, height);
  image(imagemFundo2, 0, yFundo2, width, height);
  yFundo1 += 0.5;
  yFundo2 += 0.5;
  if (yFundo1 >= height) {
    yFundo1 = -height;
  }
  if (yFundo2 >= height) {
    yFundo2 = -height;
  }
}

//Fase 3

function fase3() {
  jogadorY -= velJogador;
  if (jogadorY<=height-130) {
    velJogador = 0;
  }
  if(!musicaPlay) {
    teleporte.play();
    musicaFase1.loop();
    musicaPlay = true;
  }
  exibirFundo3();
  jogador();
  criarObstaculos3();
  criarEstrela();
  barraLife();
  desenharPoderes();
  verificarColisaoInimigo();
  verificarColisaoEstrela();
  verificarColisaoPoderes();
  desenharPontuacao();
  if(pontuacao>=20) {
    estado=15;
    pontuacao=0;
    musicaPlay = false;
    musicaFase1.stop();
  }
  if(keyIsDown(ESCAPE)){
    estado=0;
    mostrarBotao();
    resetarFase();
    musicaFase1.stop();
    musicaPlay = false;
  }
}

function criarObstaculos3() {
  if(frameCount%20===0) {  //Aumenta a quantidade de inimigos
    let obstaculoX = random(0, width-100); 
    let obstaculoY = -80;
    obstaculos.push({x: obstaculoX, y: obstaculoY});
  }
  for (let i = obstaculos.length - 1; i >= 0; i--) {
    let obstaculo = obstaculos[i];
    image(imagemObstaculo, obstaculo.x, obstaculo.y, 100, 100);
    obstaculo.y += 5;
    if (obstaculo.y > height) {
      obstaculos.splice(i, 1);
    }
  }
}

function exibirFundo3() {
  image(imagemFundo3, 0, yFundo1, width, height);
  image(imagemFundo3, 0, yFundo2, width, height);
  yFundo1 += 0.5;
  yFundo2 += 0.5;
  if (yFundo1 >= height) {
    yFundo1 = -height;
  }
  if (yFundo2 >= height) {
    yFundo2 = -height;
  }
}

//Fase 4

function fase4() {
  jogadorY -= velJogador;
  if (jogadorY<=height-130) {
    velJogador = 0;
  }
  if(!musicaPlay) {
    teleporte.play();
    musicaFase2.loop();
    musicaPlay = true;
  }
  exibirFundo4();
  jogador3();
  criarObstaculos4();
  criarEstrela();
  barraLife();
  desenharPoderes();
  verificarColisaoInimigo();
  verificarColisaoEstrela();
  verificarColisaoPoderes();
  desenharPontuacao();
  if(pontuacao>=20) {
    estado=17;
    pontuacao=0;
    musicaPlay = false;
    musicaFase2.stop();
  }
  if(keyIsDown(ESCAPE)){
    estado=0;
    mostrarBotao();
    resetarFase();
    musicaFase2.stop();
    musicaPlay = false;
  }
}

function criarObstaculos4() {
  if (frameCount % 60 === 0) {
    for (let j = 0; j < 6; j++) {
      let obstaculoX = random(0, width-100);
      let obstaculoY = -80;
      obstaculos.push({ x: obstaculoX, y: obstaculoY });
    }
  }
  for (let i = obstaculos.length - 1; i >= 0; i--) {
    let obstaculo = obstaculos[i];
    image(imagemObstaculo, obstaculo.x, obstaculo.y, 100, 100);
    obstaculo.y += 8;
    if (obstaculo.y > height) {
      obstaculos.splice(i, 1);
    }
  }
}

function exibirFundo4() {
  image(imagemFundo4, 0, yFundo1, width, height);
  image(imagemFundo4, 0, yFundo2, width, height);
  yFundo1 += 0.5;
  yFundo2 += 0.5;
  if (yFundo1 >= height) {
    yFundo1 = -height;
  }
  if (yFundo2 >= height) {
    yFundo2 = -height;
  }
}

//Fase 5

function fase5() {
  jogadorY -= velJogador;
  if (jogadorY<=height-130) {
    velJogador = 0;
  }
  if(!musicaPlay) {
    teleporte.play();
    musicaFase2.loop();
    musicaPlay = true;
  }
  exibirFundo5();
  jogador3();
  criarObstaculos5();
  criarEstrela();
  desenharPoderes();
  barraLife();
  verificarColisaoInimigo();
  verificarColisaoEstrela();
  verificarColisaoPoderes();
  desenharPontuacao();
  if(pontuacao>=25) {
    estado=19;
    pontuacao=0;
    musicaPlay = false;
    musicaFase2.stop();
  }
  if(keyIsDown(ESCAPE)){
    estado=0;
    mostrarBotao();
    resetarFase();
    musicaFase2.stop();
    musicaPlay = false;
  }
}

function criarObstaculos5() {
  if (frameCount % 60 === 0) {
    for (let j = 0; j < 5; j++) {
      let obstaculoX = random(0, width-80);
      let obstaculoY = -80;
      obstaculos.push({ x: obstaculoX, y: obstaculoY });
    }
  }
  for (let i = obstaculos.length - 1; i >= 0; i--) {
    let obstaculo = obstaculos[i];
    image(imagemObstaculo, obstaculo.x, obstaculo.y, 100, 100);
    obstaculo.y += 10;
    if (obstaculo.y > height) {
      obstaculos.splice(i, 1);
    }
  }
}

function exibirFundo5() {
  image(imagemFundo5, 0, yFundo1, width, height);
  image(imagemFundo5, 0, yFundo2, width, height);
  yFundo1 += 0.5;
  yFundo2 += 0.5;
  if (yFundo1 >= height) {
    yFundo1 = -height;
  }
  if (yFundo2 >= height) {
    yFundo2 = -height;
  }
}

//Fase 6 (BOSS)

function fase6() {
  limite = 945;
  jogadorY -= velJogador;
  if (jogadorY<=height-130) {
    velJogador = 0;
  }
  somTiro.stop();
  if(!musicaPlay) {
    teleporte.play();
    musicaFase3.loop();
    musicaPlay = true;
  }
  exibirFundo();
  jogador2();
  boss();
  criarObstaculos6();
  criarEstrela();
  verificarColisaoInimigo2();
  verificarColisaoEstrela2();
  barraLife();
  desenharPontuacao();
  if(pontuacao>=20) {
    estado=21;
    pontuacao=0;
    musicaPlay = false;
    musicaFase3.stop();
  }
  if(keyIsDown(ESCAPE)){
    estado=0;
    mostrarBotao();
    resetarFase();
    musicaFase3.stop();
    musicaPlay = false;
  }
}

function verificarColisaoEstrela2() {
    //fill(255, 0, 0, 100); 
    //ellipse(xstar, ystar, 70);
    //ellipse(jogadorX+25, jogadorY+50, 40, 100);
  if (collideCircleCircle(xstar, ystar, 70, jogadorX+25, jogadorY+50, 40, 100)) {
    xstar = random(20, width-80);
    ystar = -80;
    somEstrela.play();
    pontuacao++;
  }
}

function criarObstaculos6() {
  if (frameCount % 50 === 0) {
    for (let j = 0; j < 9; j++) {
      let obstaculoX = random(0, width-70);
      let obstaculoY = -110;
      obstaculos.push({ x: obstaculoX, y: obstaculoY });
    }
  }
  for (let i = obstaculos.length - 1; i >= 0; i--) {
    let obstaculo = obstaculos[i];
    image(imagemObstaculo2, obstaculo.x, obstaculo.y, 70, 120);
    obstaculo.y += 11;
    if (obstaculo.y > 800 || obstaculo.y < -110) {
      obstaculos.splice(i, 1);
    }
  }
}

function verificarColisaoInimigo2() { 
  for (let i = obstaculos.length - 1; i >= 0; i--) {
    let obstaculo = obstaculos[i];
    //fill(255, 0, 0, 100); 
    //ellipse(obstaculo.x+35, obstaculo.y+75, 60);
    //ellipse(jogadorX+25, jogadorY+50, 40, 80);
    if (colisao && collideCircleCircle(obstaculo.x+35, obstaculo.y+75, 60, jogadorX+25, jogadorY+50, 40, 80)) {
      colisao = false;
      colisaoFrame = frameCount;
      obstaculos.splice(i, 1); 
      somDeath.play();
      life--;
      jogadorPisca = true;
      setTimeout(pararPisca, 600);
      setTimeout(colisaoF, 1000)
     }    
  }
}

function boss() {
  push();
  translate(xsol + 625, ysol + 625); // Define o centro da rotação
  rotate(anguloSol); // Aplica a rotação
  image(imagemSol, -625, -625, 1250, 1250); // Desenha o sol
  pop();
  anguloSol += 0.0025; // Aumenta o ângulo de rotação

  ysol += velSol; // Desce o sol
  if (ysol >= -925) {
    velSol = 0;
  }
}

//Transições

function mission1() {
  clear();
  background(imagemMission1);
  botaoNext.show();
  obstaculos.splice(0, obstaculos.length);
  poderes.splice(0, poderes.length);
  xstar = random(70, width-70);
  ystar = -70;
  yFundo1 = 0;
  yFundo2 = -height;
}

function mission2() {
  clear();
  background(imagemMission2);
  botaoNext.show();
  obstaculos.splice(0, obstaculos.length);
  poderes.splice(0, poderes.length);
  xstar = random(70, width-70);
  ystar = -70;
  yFundo1 = 0;
  yFundo2 = -height;
}

function mission3() {
  clear();
  background(imagemMission3);
  botaoNext.show();
  obstaculos.splice(0, obstaculos.length);
  poderes.splice(0, poderes.length);
  xstar = random(70, width-70);
  ystar = -70;
  yFundo1 = 0;
  yFundo2 = -height;
}

function mission4() {
  clear();
  background(imagemMission4);
  botaoNext.show();
  obstaculos.splice(0, obstaculos.length);
  poderes.splice(0, poderes.length);
  xstar = random(70, width-70);
  ystar = -70;
  yFundo1 = 0;
  yFundo2 = -height;
}

function mission5() {
  clear();
  background(imagemMission5);
  botaoNext.show();
  obstaculos.splice(0, obstaculos.length);
  poderes.splice(0, poderes.length);
  xstar = random(70, width-70);
  ystar = -70;
  yFundo1 = 0;
  yFundo2 = -height;
}

function mission6() {
  clear();
  background(imagemMission6);
  botaoNext.show();
  obstaculos.splice(0, obstaculos.length);
  poderes.splice(0, poderes.length);
  xstar = random(70, width-70);
  ystar = -70;
  yFundo1 = 0;
  yFundo2 = -height;
}

function ursaTela() {
  background(imagemUrsa);
  botaoNext.show();
  obstaculos.splice(0, obstaculos.length);
  poderes.splice(0, poderes.length);
  xstar = random(70, width-70);
  ystar = -70;
  yFundo1 = 0;
  yFundo2 = -height;
}

function cruzeiroTela() {
  background(imagemCruzeiro);
  botaoNext.show();
  obstaculos.splice(0, obstaculos.length);
  poderes.splice(0, poderes.length);
  xstar = random(70, width-70);
  ystar = -70;
  yFundo1 = 0;
  yFundo2 = -height;
}

function orionTela() {
  background(imagemOrion);
  botaoNext.show();
  obstaculos.splice(0, obstaculos.length);
  poderes.splice(0, poderes.length);
  xstar = random(70, width-70);
  ystar = -70;
  yFundo1 = 0;
  yFundo2 = -height;
}

function scorpionTela() {
  background(imagemScorpion);
  botaoNext.show();
  obstaculos.splice(0, obstaculos.length);
  poderes.splice(0, poderes.length);
  xstar = random(70, width-70);
  ystar = -70;
  yFundo1 = 0;
  yFundo2 = -height;
}

function cisneTela() {
  background(imagemCisne);
  botaoNext.show();
  obstaculos.splice(0, obstaculos.length);
  poderes.splice(0, poderes.length);
  xstar = random(70, width-70);
  ystar = -70;
  yFundo1 = 0;
  yFundo2 = -height;
}

function solTela() {
  background(telaSol);
  botaoNext.show();
  obstaculos.splice(0, obstaculos.length);
  poderes.splice(0, poderes.length);
  xstar = random(70, width-70);
  ystar = -70;
  yFundo1 = 0;
  yFundo2 = -height;
}

function barraLife() {
  if(estado==1 || estado==5 || estado==6 || estado==7 || estado==8 || estado==9) {
    if(life==6) {
        fill(255);
        textAlign(LEFT); 
        fill('#b71951');
        stroke('#5532d1');
        strokeWeight(4);
        textFont("Comic Sans");
        textSize(70);
        text('❤ ❤ ❤', 10, 10);
    } if(life==5) {
        fill(255);
        textAlign(LEFT); 
        fill('#b71951');
        stroke('#5532d1');
        strokeWeight(4);
        textFont("Comic Sans");
        textSize(70);
        text('❤ ❤ ♡', 10, 10);
    } if(life==4) {
        fill(255);
        textAlign(LEFT); 
        fill('#b71951');
        stroke('#5532d1');
        strokeWeight(4);
        textFont("Comic Sans");
        textSize(70);
        text('❤ ❤', 10, 10);
    } if(life==3) {
        fill(255);
        textAlign(LEFT); 
        fill('#b71951');
        stroke('#5532d1');
        strokeWeight(4);
        textFont("Comic Sans");
        textSize(70);
        text('❤ ♡', 10, 10);
    } if(life==2) {
        fill(255);
        textAlign(LEFT); 
        fill('#b71951');
        stroke('#5532d1');
        strokeWeight(4);
        textFont("Comic Sans");
        textSize(70);
        text('❤', 10, 10);  
    } if(life==1) {
        fill(255);
        textAlign(LEFT); 
        fill('#b71951');
        stroke('#5532d1');
        strokeWeight(4);
        textFont("Comic Sans");
        textSize(70);
        text('♡', 10, 10);  
    } if(life==0) {
        musicaPlay = false;
        somGOverPlay = false;
        estado = 4; 
    }
  }  
}

function pararPisca(){
  jogadorPisca = false;
}






