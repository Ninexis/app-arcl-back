import { Router } from "express";
import { query } from "./db.js";

const router = Router();

async function ensureCookieRow() {
  await query(
    `INSERT INTO cookies (id, count, total_produced)
     VALUES (1, 0, 0)
     ON CONFLICT (id) DO NOTHING`);
}

router.get("/load_game_data", async (_, res, next) => {
  try {
    await ensureCookieRow();

    const cookieRow = await query(
      "SELECT count, total_produced FROM cookies WHERE id = 1"
    );
    const { count: cookieCount, total_produced: totalProduced } = cookieRow.rows[0];

    const purchasedClicker = await query(
      `SELECT b.cost, b.price_increase, b.cps
       FROM purchased_buildings pb
       JOIN buildings b ON pb.building_id = b.id
       WHERE b.id = 1`
    );

    const purchasedBuildings = await query(
      `SELECT b.cost, b.price_increase, b.cps
       FROM purchased_buildings pb
       JOIN buildings b ON pb.building_id = b.id
       WHERE b.id = 2`
    );

    res.json({
      cookieCount,
      totalCookiesProduced: totalProduced,
      autoClickerCount: purchasedClicker.rowCount,
      buildingCount: purchasedBuildings.rowCount,
      purchased_clicker: purchasedClicker.rows,
      purchased_buildings: purchasedBuildings.rows,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/save_game_data", async (req, res, next) => {
  try {
    const { cookieCount, totalCookiesProduced } = req.body;
    if (Number.isNaN(cookieCount) || Number.isNaN(totalCookiesProduced)) {
      return res.status(400).json({ error: "Valeurs invalides" });
    }

    await ensureCookieRow();

    await query(
      `UPDATE cookies SET count = $1, total_produced = $2 WHERE id = 1`,
      [cookieCount, totalCookiesProduced]
    );

    res.json({ message: "Données mises à jour" });
  } catch (err) {
    next(err);
  }
});

router.post("/buy_building", async (req, res, next) => {
  try {
    const { building_id } = req.body;
    const b = await query(`SELECT id FROM buildings WHERE id = $1`, [building_id]);
    if (b.rowCount === 0) {
      return res.status(404).json({ error: "Bâtiment non trouvé" });
    }

    await query(
      `INSERT INTO purchased_buildings (building_id) VALUES ($1)`,
      [building_id]
    );

    res.json({ message: "Bâtiment acheté" });
  } catch (err) {
    next(err);
  }
});

router.post("/delete_building", async (req, res, next) => {
  try {
    const { building_id } = req.body;
    await query(
      `DELETE FROM purchased_buildings WHERE building_id = $1`,
      [building_id]
    );
    res.json({ message: "Bâtiment supprimé" });
  } catch (err) {
    next(err);
  }
});

export default router;
