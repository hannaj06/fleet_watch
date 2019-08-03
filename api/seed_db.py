from db_utils.pg_connect import pg_connect


db = pg_connect('postgres', 'databases.conf')

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
VALUES('Andy', 'McLaughlin', 'andy@example.com', md5('place_holder'), false, '{"admin": true, "captain": true}', true)
''',

'''
INSERT INTO members(first_name, last_name, email, password, private_single, status, active)
VALUES('Alex', 'Brown', 'alex@example.com', md5('place_holder'), false, '{"admin": true}', true)
''',

'''
INSERT INTO members(first_name, last_name, email, password, private_single, active)
VALUES('Mike', 'Battaglia', 'mike@example.com', md5('place_holder'), false, true)
'''
]

db.transaction(members_data, pprint=True)

trips_data = [
'''
INSERT INTO trips(launch, land, meters, member_id, boat_id)
VALUES('2019-07-01 04:30:00', '2019-07-01 06:00:00', 2000, 1, 1)
''',

'''
INSERT INTO trips(launch, land, meters, member_id, boat_id)
VALUES('2019-07-01 04:30:00', '2019-07-01 06:00:00', 2000, 1, 2)
''',

'''
INSERT INTO trips(launch, land, meters, member_id, boat_id)
VALUES('2019-07-01 04:30:00', '2019-07-01 06:00:00', 2000, 2, 1)
''',

'''
INSERT INTO trips(launch, land, meters, member_id, boat_id)
VALUES('2019-07-01 04:30:00', '2019-07-01 06:00:00', 2000, 2, 3)
'''

]

db.transaction(trips_data, pprint=True)

print(db.get_df_from_query('''
SELECT * FROM members
    ''', pprint=True))