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

	- Instalar o Docker [https://www.docker.com/], Docker Compose [https://docs.docker.com/compose/install/], Java [https://www.java.com/en/download/] e Spring Boot com Maven [https://docs.spring.io/spring-boot/docs/current/reference/html/getting-started.html] instuções nos links;

	- Fazer o git clone deste repositório, ou baixá-lo e extraí-lo na sua pasta de preferência;

	- Na mesmma pasta fazer o git clone do projeto PersonCRUD [https://github.com/mrpaulo/PersonCRUD] ou baixa-lo e extrai-lo;

	- Através de um terminal dentro da pasta PersonCRUD executar o comando: "mvn clean package" -- que compila o programa do backend (PersonCRUD);

	- Dentro da pasta do PersonCRUD copiar o arquivo docker-compose.yml para a mesma pasta onde estão os dois projetos (PersonCRUD e front-pessoa_crud);		
		
	- Através de um terminal na pasta onde estão os projetos e o arquivo docker-compose.yml executar o comando: "docker-compose up --build"  
		
Instruções de uso:
	No navegador de sua preferência (recomendo Chrome) acesse [http://localhost:9090/login]  E pronto!
