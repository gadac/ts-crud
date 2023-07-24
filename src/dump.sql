create table carros(
	id serial primary key,
  	marca text,
  	modelo text,
  	ano integer,
  	cor text,
  	valor integer
);

-- Inserir carro 1
INSERT INTO carros (marca, modelo, ano, cor, valor)
VALUES ('Toyota', 'Corolla', 2022, 'Prata', 35000);

-- Inserir carro 2
INSERT INTO carros (marca, modelo, ano, cor, valor)
VALUES ('Honda', 'Civic', 2021, 'Preto', 30000);

-- Inserir carro 3
INSERT INTO carros (marca, modelo, ano, cor, valor)
VALUES ('Ford', 'Mustang', 2020, 'Vermelho', 45000);

-- Inserir carro 4
INSERT INTO carros (marca, modelo, ano, cor, valor)
VALUES ('Chevrolet', 'Camaro', 2023, 'Amarelo', 50000);

-- Inserir carro 5
INSERT INTO carros (marca, modelo, ano, cor, valor)
VALUES ('Nissan', 'Sentra', 2019, 'Branco', 28000);
