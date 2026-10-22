const express = require("express");
const authenticate = require("../middleware/authenticate");
const { listTasks } = require("../services/taskStore");

const router = express.Router();

router.get("/", authenticate, (req, res) => {
  const page = req.query.page ? Number(req.query.page) : 1;
  const pageSize = req.query.pageSize ? Number(req.query.pageSize) : undefined;

  const result = listTasks({
    page,
    pageSize,
    status: req.query.status,
    assigneeId: req.query.assigneeId,
  });

  res.json(result);
});

module.exports = router;
