const { exec } = require('child_process');
const dependencia = 'pcap';
const readline = require('readline');

async function verificarDependencia(dependencia) {
  try {
    await exec.command(`node -e "require('${dependencia}')"`);
    console.log(`A dependência '${dependencia}' está instalada.`);
    console.log(`'${dependencia}' está instalada.`);
  } catch (error) {
    console.log(`A dependência '${dependencia}' não está instalada.`);

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question(`Deseja instalar a dependência '${dependencia}'? (s/n): `, async (resposta) => {
      if (resposta.toLowerCase() === 's') {
        await instalarDependencia(dependencia);
      } else {
        console.log('Dependência não instalada. Encerrando o programa.');
        process.exit(1);
      }

      rl.close();
    });
  }
}

async function instalarDependencia(dependencia) {
  try {
    console.log(`Instalando a dependência '${dependencia}'...`);
    await exec.command(`npm install ${dependencia}`);
    console.log(`A dependência '${dependencia}' foi instalada com sucesso.`);
  } catch (error) {
    console.error(`Ocorreu um erro ao instalar a dependência '${dependencia}':`, error);
  }
}

verificarDependencia(dependencia);

//*SNIFFER
const pcap = require('pcap');

function iniciarCaptura() {
  const filtro = 'tcp port 80 and not ip6';
  const pcapSession = pcap.createSession('wlan0', filtro);

  pcapSession.on('packet', function (pacote) {
    const pacoteDecodificado = pcap.decode.packet(pacote);
    console.log(pacoteDecodificado);
  });
}

verificarPrivilegiosSudo();
verificarDependencia(dependencia);
iniciarCaptura();

function verificarPrivilegiosSudo() {
  const isSudo = process.env.SUDO_USER;
  if (!isSudo) {
    console.log('Este sniffer requer privilégios sudo para ser executado.');
    console.log('Comando main: "sudo node snifferpcap.js"');
    process.exit(1);
  }
}

//*Mirai - 2058
