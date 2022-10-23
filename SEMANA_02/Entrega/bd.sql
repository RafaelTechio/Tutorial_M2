CREATE TABLE curriculo ( path_foto VARCHAR(255),
nome VARCHAR(50),
cargo VARCHAR(50),
telefone VARCHAR(50),
endereco VARCHAR(50),
email VARCHAR(50),
descricao VARCHAR(255),
id INTEGER PRIMARY KEY AUTOINCREMENT);

CREATE TABLE experiencia ( cargo VARCHAR(50),
empresa VARCHAR(50),
id INTEGER PRIMARY KEY AUTOINCREMENT,
descricao VARCHAR(255),
inicio DATE,
fim DATE,
idcurriculo INT, FOREIGN KEY (idcurriculo) REFERENCES curriculo(id) );

CREATE TABLE formacao ( curso VARCHAR(50),
descricao VARCHAR(50),
id INTEGER PRIMARY KEY AUTOINCREMENT,
inicio DATE,
fim DATE,
idcurriculo INT,
FOREIGN KEY (idcurriculo) REFERENCES curriculo(id) );

CREATE TABLE realizacao ( id INTEGER PRIMARY KEY AUTOINCREMENT,
nome VARCHAR(50),
ano DATE,
descricao VARCHAR(255),
idcurriculo INT, FOREIGN KEY (idcurriculo) REFERENCES curriculo(id) );

CREATE TABLE habilidade ( nome VARCHAR(50), id INTEGER PRIMARY KEY AUTOINCREMENT,
atual INT,
maxima INT,
idcurriculo INT, FOREIGN KEY (idcurriculo) REFERENCES curriculo(id) );

CREATE TABLE personalidade ( nome VARCHAR(50),
id INTEGER PRIMARY KEY AUTOINCREMENT,
atual INT,
maxima INT,
idcurriculo INT, FOREIGN KEY (idcurriculo) REFERENCES curriculo(id) );