-- cookies : 1 seule ligne que l’on mettra à jour
CREATE TABLE IF NOT EXISTS cookies (
  id              INT PRIMARY KEY,
  count           INT DEFAULT 0,
  total_produced  INT DEFAULT 0
);

-- référentiel de bâtiments
CREATE TABLE IF NOT EXISTS buildings (
  id             INT PRIMARY KEY,
  cost           NUMERIC NOT NULL,
  price_increase NUMERIC NOT NULL,
  cps            NUMERIC NOT NULL
);

-- achats effectués par le joueur
CREATE TABLE IF NOT EXISTS purchased_buildings (
  id          SERIAL PRIMARY KEY,
  building_id INT REFERENCES buildings(id)
);

-- 2 types de bâtiments par défaut
INSERT INTO buildings (id, cost, price_increase, cps) VALUES
  (1, 10,  1.15, 2),   -- autoclicker
  (2, 100, 1.15, 1)
ON CONFLICT (id) DO NOTHING;

