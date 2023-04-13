create table users (
	id varchar primary key,
	name varchar(200),
	email varchar(200),
	password varchar(200),
	project_ids varchar[]
);

create table project (
	id varchar primary key,
	title varchar(200),
	description varchar(200),
	user_ids varchar[],
	times_ids varchar[]
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

insert into category (id, name, parent_id) values ('1', 'um', null);
