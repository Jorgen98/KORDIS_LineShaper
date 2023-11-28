CREATE EXTENSION postgis CASCADE;
CREATE TABLE IF NOT EXISTS railMap (gid SERIAL PRIMARY KEY, geom GEOMETRY, conns INT[]);
CREATE TABLE IF NOT EXISTS roadMap (gid SERIAL PRIMARY KEY, geom GEOMETRY, conns INT[]);
CREATE TABLE IF NOT EXISTS tramMap (gid SERIAL PRIMARY KEY, geom GEOMETRY, conns INT[]);
CREATE TABLE IF NOT EXISTS stops (id SERIAL PRIMARY KEY, code INT, name TEXT);
CREATE TABLE IF NOT EXISTS signs (id SERIAL PRIMARY KEY, code INT, subCode TEXT, geom GEOMETRY);