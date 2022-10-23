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
instituicao VARCHAR(50),
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

INSERT INTO curriculo 
	(cargo, descricao, email, endereco, nome, path_foto, telefone)
VALUES
	('Summer Job', 
	'Desenvolvedor Web fullstack motivado',
	'techiorafael@gmail.com',
	'Rua MMDC, 80 - Butantã. São Paulo - SP', 
	'Rafael Techio', 
	'avatar.png', 
	'(45)99913-2871');

INSERT INTO experiencia
	(cargo, descricao, empresa, inicio, fim, idcurriculo)
VALUES
	('Estagiário', 'Estagiário de automação', 'ITAI - PTI', '2019-10-01', '2020-02-28', 1),
	('Estagiário Dev WEB', 'Estagiário de desenvolvimento WEB', 'Portal Vegano', '2020-03-01', '2022-02-28', 1),
	('Dev Web Jr', 'Desenvolvedor Web Junior', 'Portal Vegano', '2022-03-08', '2022-08-30', 1);

INSERT INTO formacao
	(curso, descricao, instituicao, inicio, fim, idcurriculo)
VALUES
	('Técnico Informática', 'Ensino médio com técnico', 'IFPR', '2018-02-01', '2022-04-30', 1),
	('Engenharia de software', 'Bacharelado', 'INTELI', '2022-08-01', NULL, 1);

INSERT INTO habilidade
	(nome, maxima, atual, idcurriculo)
VALUES
	('PHP', 5, 3, 1),
	('Javascript', 5, 2, 1),
	('SQL', 5, 4, 1),
	('HTML', 5, 3, 1),
	('CSS', 5, 2, 1);

INSERT INTO personalidade
	(nome, maxima, atual, idcurriculo)
VALUES
	('Dedicação', 5, 5, 1),
	('Comprometimento', 5, 5, 1),
	('Liderança', 5, 4, 1),
	('Trabalho em grupo', 5, 4, 1),
	('Inovação', 5, 4, 1);

INSERT INTO realizacao
	(nome, descricao, ano, idcurriculo)
VALUES
	('Membro JUJA', 'Membro voluntário do grupo de jovens JUJA', 2018, 1),
	('Membro Robótica', 'Membro voluntário do clube de robótica do IFPR', 2019, 1),
	('Membro Inteli Finance', 'Membro voluntário da liga de mercado financeiro', 2022, 1),
	('Membro Clube de Música', 'Membro voluntário do clube de música da Inteli', 2022, 1);