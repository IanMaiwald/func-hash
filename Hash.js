var crypto = require('crypto')
    , fs = require('fs')
	
var rotas = [];
var hashes = [];


//Aqui você pode pegar a rota dos arquivos de teste!
var arquivo1 = __dirname + "/arquivo1.txt"
, arquivo2 = __dirname + "/arquivo2.txt";
	
console.log("Rota de teste 1:", arquivo1);
console.log("Rota de teste 2:", arquivo2);


const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Digite a rota e o nome do arquivo 1: ', (rota) => {
	rotas.push(rota);
	rl.question('Digite a rota e o nome do arquivo 2: ', (rota) => {
		rotas.push(rota);
		
		console.log('As hashs são exibidas na ordem que foram inseridas.');
		
		getHash(rotas[0], function(hs){
			hashes.push(hs);
			console.log('Hash 1:', hashes[0]);
		})
		getHash(rotas[1], function(ha){
			hashes.push(ha);
			console.log('Hash 2:', hashes[1]);
			
			hashIgual(hashes[0], hashes[1]);
		})
		rl.close();
	});
});

function getHash(rotaArquivo, cb){
	
	var hash;

	// Algoritmo depende da disponibilidade da plataforma OpenSSL
	// Outros algoritmos: 'sha1', 'md5', 'sha256', 'sha512' ...
	var algoritmo = 'sha1',
	shasum = crypto.createHash(algoritmo)

	// Atualizando o shasum com o conteúdo do arquivo
	var s = fs.ReadStream(rotaArquivo)
	s.on('data', function(data) {
		shasum.update(data)
	})

	// Fazendo digest
	s.on('end', function() {
		hash = shasum.digest('hex');
		return cb(hash);
	})
	
}

function hashIgual(hash1, hash2){
	
	if(hash1 === hash2){
		console.log('As hashs são iguais!');
	}
	else{
		console.log('As hashs são diferentes!');
	}
	
}
