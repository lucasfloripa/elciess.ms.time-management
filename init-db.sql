create table users (
	id varchar primary key,
	name varchar(200),
	email varchar(200),
	password varchar(200)
);

create table project (
	id varchar primary key,
	title varchar(200),
	description varchar(200)
);

create table time (
	id varchar primary key,
	project_id varchar(200),
	user_id varchar(200),
	started_at varchar(200),
	ended_at varchar(200),
	constraint fk_project foreign key (project_id) references project(id),
	constraint fk_users foreign key (user_id) references users(id)
)

INSERT INTO users (id, name, email, password) VALUES ('1', 'name1', 'email1@mail.com', 'password1');
INSERT INTO users (id, name, email, password) VALUES ('2', 'name2', 'email2@mail.com', 'password2');
INSERT INTO users (id, name, email, password) VALUES ('3', 'name3', 'email3@mail.com', 'password3');

INSERT INTO project (id, title, description) VALUES ('1', 'title1', 'description1');
INSERT INTO project (id, title, description) VALUES ('2', 'title2', 'description2');
INSERT INTO project (id, title, description) VALUES ('3', 'title3', 'description3');

INSERT INTO time (id, project_id, user_id, started_at, ended_at) VALUES ('1', '1', '1', '2023-04-13T14:00:00.704Z', '2023-04-13T15:00:00.704Z');
INSERT INTO time (id, project_id, user_id, started_at, ended_at) VALUES ('2', '1', '2', '2023-04-13T14:00:00.704Z', '2023-04-13T16:00:00.704Z');
INSERT INTO time (id, project_id, user_id, started_at, ended_at) VALUES ('3', '3', '2', '2023-04-13T14:00:00.704Z', '2023-04-13T17:00:00.704Z');
