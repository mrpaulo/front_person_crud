Front Person CRUD (front_person_crud)

Este é um projeto em ReactJS de um cadastro de pessoas com uma autenticação basic através de uma tela de login.
Possui as seguintes características:
- Nome com no máximo 100 caracteres e de preenchimento obrigatório;
- CPF com um número válido, não pode ter outra pessoa já cadastrada com o mesmo número e de preenchimento obrigatório;
- Data de nascimento ser uma data válida e não posterior a data do cadastro e de preenchimento obrigatório;
- Caso seja preenchido o e-mail ter o padrão mínimo "usuario@provedor.com" com no máximo 100 caracteres;
- Informação de sexo, através de um seletor;
- Informação de cidade de nascimento com no máximo 100 caracteres;
- Informação de país de nascimento com no máximo 100 caracteres;

O Front Person CRUD integra com meu projeto PersonCRUD [https://github.com/mrpaulo/PersonCRUD] que foi feito em Java Spring Boot para servir-lo e para persistir os dados foi usado o PostgresSQL para fazer a ligação entre os dois foi utilizado o Nginx.

Foram feitas as configurações necessárias para criar uma imagem dele com Docker e colocá-lo em um conteiner para rodar juntamente com o PersonCRUD (backend);

Instruções para instalação: 
	- Instalar o Docker [https://www.docker.com/], Docker Compose [https://docs.docker.com/compose/install/], Java [https://www.java.com/en/download/], Spring Boot com Maven [https://docs.spring.io/spring-boot/docs/current/reference/html/getting-started.html] e PostgresSQL [https://www.postgresql.org/] instuções nos links;
	- Fazer o git clone deste repositório, ou baixá-lo e extraí-lo na sua pasta de preferência;
	- Dentro da pasta do projeto através de um terminal rodar o comando "docker build -t rodrigues/frontapppersoncrud:2 . " (sem as aspas);
	- Sair da pasta do projeto e fazer o git clone do projeto PersonCRUD [https://github.com/mrpaulo/PersonCRUD] ou baixa-lo e extrai-lo na sua pasta de preferência;
	- Dentro da pasta do PersonCRUD através de um terminal rodar os comandos o que está dentro das aspas: 
		1 - "docker create -v /var/lib/postgresql/data --name postgres alpine"; -- Cria a imagem do banco de dados
		2 - "docker run -p 5432:5432 --name postgres -e POSTGRES_PASSWORD=postgres -d --volumes-from postgres postgres" -- Roda a imagem para ter acesso ao banco de dados, se der erro de porta mude a parte que vem depois do -p ou pare o postgres que está rodando localmente;
		3 - "psql -U postgres " -- Acessa o banco de dados, irá pedir uma senha que é postgres;
		4 - "create database cadastro_pessoa" -- Cria o banco de dados;
		5 - "\q" -- para sair do postgres;
		6 - "docker ps" -- para pegar o identificador do conteiner do postgres (ID_DO_CONTEINER);
		7 - "docker stop ID_DO_CONTEINER" substituindo a palavra ID_DO_CONTEINER pelo codigo que aparece na primeira coluna (CONTAINER ID) do resultado do comando docker ps;
		8 - "mvn clean package" -- compile o programa do backend (PersonCRUD)
		9 - "docker build -t rodrigues/backpersoncrud:1 . " -- Cria a imagem do backend (PersonCRUD)
		10 - "docker-compose up --build" -- Cria a imagem do backend 
		
Instruções de uso:
	No navegador de sua preferência (recomendo Chrome) acesse [http://localhost:9090/]  E pronto!
