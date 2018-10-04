create table if not exists infocom.users
(
	user_id serial not null
		constraint user_user_id_pk
			primary key,
	username varchar(50) not null unique,
	password varchar(50) not null,
	fullname varchar(100) not null,
	is_admin boolean not null default false
);

create table if not exists infocom.company
(
	company_id serial not null
		constraint company_company_id_pk
			primary key,
	name varchar(255) not null,
	ownership varchar(50) not null,
	website varchar(100),
	legal_form varchar(255),
	chief_name varchar(255) not null,
  fax varchar(100),
  phone_number varchar(20) not null,
  licence_number varchar(50) not null unique,
  licence_date timestamp,
  certificate_number varchar(50),
  certificate_date timestamp,
  address varchar(255) not null
);

create table if not exists infocom.employee
(
	employee_id serial not null
		constraint employee_employee_id_pk
			primary key,
	name varchar(255) not null,
	surname varchar(255) not null,
	company_id integer not null
	  constraint employee_company_company_id_fk
    references company,
  email varchar(255) not null,
  account_details varchar(255),
  position varchar(100) not null,
	phone_number varchar(20),
	home_number varchar(20),
	work_number varchar(20),
	address varchar(255)
);
