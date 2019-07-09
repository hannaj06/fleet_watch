from db_utils.pg_connect import pg_connect


db = pg_connect('postgres', 'databases.conf')

drop_tables = [
'DROP TABLE IF EXISTS boat_manufacturer CASCADE',
'DROP TABLE IF EXISTS rigging CASCADE',
'DROP TABLE IF EXISTS boats CASCADE',
'DROP TABLE IF EXISTS trips CASCADE',
'DROP TABLE IF EXISTS certification_level CASCADE',
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
serial_num varchar(100),
checked_out timestamp
);
''',

'''
CREATE TABLE members(
member_id serial primary key,
first_name varchar(100) not null,
last_name varchar(100) not null,
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
CREATE TABLE certification_level(
cert_id serial primary key,
level varchar(20) not null,
description text
)
''',

'''
CREATE TABLE captains_test(
test_id serial primary key,
cert_id smallint references certification_level(cert_id) not null,
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

rig_sql = [
'''
INSERT INTO rigging(rig) VALUES ('1x')
''',

'''
INSERT INTO rigging(rig) VALUES ('2x/2-')
''',

'''
INSERT INTO rigging(rig) VALUES ('4x/4-')
''',

'''
INSERT INTO rigging(rig) VALUES ('4+')
''',

'''
INSERT INTO rigging(rig) VALUES ('8+')
''']

db.transaction(rig_sql, pprint=True)

boat_make = [
'''
INSERT INTO boat_manufacturer(manufacturer_name) VALUES ('Flippi');
''',

'''
INSERT INTO boat_manufacturer(manufacturer_name) VALUES ('Resolute');
''',

'''
INSERT INTO boat_manufacturer(manufacturer_name) VALUES ('Mass Aero');
''',

'''
INSERT INTO boat_manufacturer(manufacturer_name) VALUES ('Peinert');
''',

'''
INSERT INTO boat_manufacturer(manufacturer_name) VALUES ('Still Water');
''',

'''
INSERT INTO boat_manufacturer(manufacturer_name) VALUES ('Hudson');
''',

'''
INSERT INTO boat_manufacturer(manufacturer_name) VALUES ('Fluid Design');
''',

'''
INSERT INTO boat_manufacturer(manufacturer_name) VALUES ('Empacher');
''',

'''
INSERT INTO boat_manufacturer(manufacturer_name) VALUES ('Vespoli');
'''
]

db.transaction(boat_make, pprint=True)

boats = [
'''
INSERT INTO boats(boat_name, manufacturer_id, rig, max_weight_kg)
VALUES ('Caro', 2, '8+', 92)
''',

'''
INSERT INTO boats(boat_name, manufacturer_id, rig, max_weight_kg)
VALUES ('Igor', 2, '4+', 90)
''',

'''
INSERT INTO boats(boat_name, manufacturer_id, rig, max_weight_kg)
VALUES ('Nik', 2, '4+', 80)
''',

'''
INSERT INTO boats(boat_name, manufacturer_id, rig, max_weight_kg)
VALUES ('Rosette', 1, '2x/2-', 75)
''',

'''
INSERT INTO boats(boat_name, manufacturer_id, rig, max_weight_kg)
VALUES ('Peters', 1, '2x/2-', 80)
''',

'''
INSERT INTO boats(boat_name, manufacturer_id, rig, max_weight_kg)
VALUES ('Sarah White', 1, '1x', 75)
''',

'''
INSERT INTO boats(boat_name, manufacturer_id, rig, max_weight_kg)
VALUES ('Smirnoff', 1, '1x', 75)
''',

'''
INSERT INTO boats(boat_name, manufacturer_id, rig, max_weight_kg)
VALUES ('Balo', 1, '1x', 80)
''',

'''
INSERT INTO boats(boat_name, manufacturer_id, rig, max_weight_kg)
VALUES ('1936', 1, '4x/4-', 75)
''',

'''
INSERT INTO boats(boat_name, manufacturer_id, rig, max_weight_kg)
VALUES ('Osborn', 1, '4x/4-', 70)
''',

'''
INSERT INTO boats(boat_name, manufacturer_id, rig, max_weight_kg)
VALUES ('Akamai', 1, '4x/4-', 80)
''',

'''
INSERT INTO boats(boat_name, manufacturer_id, rig, max_weight_kg)
VALUES ('Morelli', 1, '4x/4-', 80)
''',

'''
INSERT INTO boats(boat_name, manufacturer_id, rig, max_weight_kg)
VALUES ('Cook', 1, '4x/4-', 80)
''',


'''
INSERT INTO boats(boat_name, manufacturer_id, rig, max_weight_kg)
VALUES ('1869', 4, '1x', 80)
'''
]

db.transaction(boats, pprint=True)


cert_level = [
'''
INSERT INTO certification_level(level, description)
VALUES ('Level 1 sculling', 'Permitted to bow club doubles and singles without a coach present.')
''',

'''
INSERT INTO certification_level(level, description)
VALUES ('Level 2 sculling', 'Permitted to bow club quads without a coach present.')
''',

'''
INSERT INTO certification_level(level, description)
VALUES ('Level 1 sweep', 'Permitted to bow club pairs without a coach present.')
''',

'''
INSERT INTO certification_level(level, description)
VALUES ('Level 2 sweep', 'Permitted to bow club straight fours without a coach present.')
'''
]

db.transaction(cert_level, pprint=True)

print(db.get_df_from_query('''
    SELECT *
    FROM boats
      JOIN boat_manufacturer USING (manufacturer_id)
    ''', pprint=True))

print(db.get_df_from_query('''
    SELECT *
    FROM certification_level
    ''', pprint=True))


members_data = [
'''
INSERT INTO members(first_name, last_name, email, password, private_single, status, active)
VALUES('Andy', 'McLaughlin', 'andy@gmail.com', md5('place_holder'), false, '{"admin": true, "captain": true}', true)
''',

'''
INSERT INTO members(first_name, last_name, email, password, private_single, status, active)
VALUES('Alex', 'Brown', 'alex@gmail.com', md5('place_holder'), false, '{"admin": true}', true)
''',

'''
INSERT INTO members(first_name, last_name, email, password, private_single, active)
VALUES('Mike', 'Battaglia', 'mike@gmail.com', md5('place_holder'), false, true)
'''
]

db.transaction(members_data, pprint=True)

print(db.get_df_from_query('''
SELECT * FROM members
    ''', pprint=True))