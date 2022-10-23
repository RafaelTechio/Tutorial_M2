# Entrega Semana 2
## Modelos do Banco de Dados de Curriculo
### <a href="https://github.com/RafaelTechio/Tutorial_M2/blob/main/SEMANA_02/Entrega/relacional_conceitual.png">Modelo conceitual</a>
<img src="https://github.com/RafaelTechio/Tutorial_M2/blob/main/SEMANA_02/Entrega/relacional_conceitual.png"> </img>
### <a href="https://github.com/RafaelTechio/Tutorial_M2/blob/main/SEMANA_02/Entrega/relacional_logico.png">Modelo lógico</a>
<img src="https://github.com/RafaelTechio/Tutorial_M2/blob/main/SEMANA_02/Entrega/relacional_logico.png"> </img>
### Modelo físico

CREATE TABLE curriculo 
( 
 path_foto VARCHAR(255),  
 nome VARCHAR(50),  
 cargo VARCHAR(50),  
 contato VARCHAR(50),  
 descricao VARCHAR(255),  
 id INT PRIMARY KEY
); 

CREATE TABLE experiencia 
( 
 cargo VARCHAR(50),  
 empresa VARCHAR(50),  
 id INT PRIMARY KEY,  
 descricao VARCHAR(255),  
 inicio DATE,  
 fim DATE,  
 idcurriculo INT,
 FOREIGN KEY (idcurriculo) REFERENCES curriculo(id) 
); 

CREATE TABLE formacao 
( 
 curso VARCHAR(50),  
 descricao VARCHAR(50),  
 id INT PRIMARY KEY,  
 inicio DATE,  
 fim DATE,  
 idcurriculo INT,  
 FOREIGN KEY (idcurriculo) REFERENCES curriculo(id)
); 

CREATE TABLE realizacao 
( 
 id INT PRIMARY KEY,  
 nome VARCHAR(50),  
 ano DATE,  
 descricao VARCHAR(255),  
 idcurriculo INT,
 FOREIGN KEY (idcurriculo) REFERENCES curriculo(id)
); 

CREATE TABLE habilidade 
( 
 nome VARCHAR(50),
 id INT PRIMARY KEY,  
 atual INT,  
 maxima INT,  
 idcurriculo INT,
 FOREIGN KEY (idcurriculo) REFERENCES curriculo(id)
); 

CREATE TABLE personalidade 
( 
 nome VARCHAR(50),  
 id INT PRIMARY KEY,  
 atual INT,  
 maxima INT,  
 idcurriculo INT,
 FOREIGN KEY (idcurriculo) REFERENCES curriculo(id)
); 

