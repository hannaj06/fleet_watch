from db_utils.pg_connect import pg_connect


db = pg_connect('postgres', 'databases.conf')

drop_tables = [
'DROP TABLE IF EXISTS boat_manufacturer CASCADE',
'DROP TABLE IF EXISTS rigging CASCADE',
'DROP TABLE IF EXISTS boats CASCADE',
'DROP TABLE IF EXISTS trips CASCADE',
'DROP TABLE IF EXISTS member_tests CASCADE',
'DROP TABLE IF EXISTS captains_test CASCADE',
'DROP TABLE IF EXISTS members CASCADE',

]

db.transaction(drop_tables, pprint=True)


create_tables = [
'''
CREATE TABLE boat_manufacturer(
manufacturer_id serial primary key,
manufacturer_name varchar(100) not null unique,
representative varchar(100),
phone_number varchar(10)
);
''',

'''
CREATE TABLE rigging(
rig varchar(10) primary key
);
''',


'''
CREATE TABLE boats(
boat_id serial primary key,
boat_name varchar(100) not null unique,
manufacturer_id int references boat_manufacturer(manufacturer_id),
rig varchar(10) references rigging(rig) not null,
max_weight_kg smallint,
min_weight_kg smallint,
checked_out timestamp
);
''',

'''
CREATE TABLE members(
member_id serial primary key,
name varchar(100) not null,
email varchar(100) not null,
password char(32) not null,
private_single boolean not null,
created_ts timestamp default now(),
status json,
active boolean not null
);
''',

'''
CREATE TABLE trips(
trip_id serial primary key,
boat_id smallint references boats(boat_id) not null,
member_id smallint references members(member_id) not null,
launch timestamp not null,
land timestamp,
meters decimal
);
''',


'''
CREATE TABLE captains_test(
test_id serial primary key,
level varchar(20) not null,
captain int references members(member_id),
test_date date not null,
description text
);
''',

'''
CREATE TABLE member_tests(
member_id int references members(member_id),
test_id int references captains_test(test_id)
);

'''
]


db.transaction(create_tables, pprint=True)
