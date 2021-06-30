Initial DB setup, after checking out the project for the first time.

Clone the project and pull the latest develop version.

1. Go in the project folder and run 
`docker-compose up` 

2. Connect to the running db 
    a. via terminal with `mysql -h 127.0.0.1 -P 3306 -u root -proot`
    b. via MySql Workbench 

3. Run the following scripts, or the scripts from `scripts/initial_scripts.mysql`:
```
-- drop database db_pco;
create database db_pco;
-- drop user springuser@'%';
create user 'springuser'@'%' identified by ':Th3@S3cr3t!'; -- Creates the user
grant all on db_pco.* to 'springuser'@'%'; -- Gives all privileges to the new user on the newly created database
```

