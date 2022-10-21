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
 nome INT,  
 cargo INT,  
 contato INT,  
 descricao INT,  
 id INT PRIMARY KEY
); 

CREATE TABLE experiencia 
( 
 cargo INT,  
 empresa INT,  
 id INT PRIMARY KEY,  
 descricao INT,  
 inicio INT,  
 fim INT,  
 idcurriculo INT,
 FOREIGN KEY (idcurriculo) REFERENCES curriculo(id) 
); 

CREATE TABLE formacao 
( 
 curso INT,  
 descricao INT,  
 id INT PRIMARY KEY,  
 inicio INT,  
 fim INT,  
 idcurriculo INT,  
 FOREIGN KEY (idcurriculo) REFERENCES curriculo(id)
); 

CREATE TABLE realizacao 
( 
 id INT PRIMARY KEY,  
 nome INT,  
 ano INT,  
 descricao INT,  
 idcurriculo INT,
 FOREIGN KEY (idcurriculo) REFERENCES curriculo(id)
); 

CREATE TABLE habilidade 
( 
 id INT PRIMARY KEY,  
 atual INT,  
 maxima INT,  
 idcurriculo INT,
 FOREIGN KEY (idcurriculo) REFERENCES curriculo(id)
); 

CREATE TABLE personalidade 
( 
 nome INT,  
 id INT PRIMARY KEY,  
 atual INT,  
 maxima INT,  
 idcurriculo INT,
 FOREIGN KEY (idcurriculo) REFERENCES curriculo(id)
); 

