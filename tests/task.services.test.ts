/// <reference types="node" />

import assert from "node:assert/strict";
import { test } from "node:test";
import {
  completeTask,
  createTask,
  deleteTask,
  findTaskById,
  listPendingTasks,
} from "../src/services/task.service.js";

test("supports the task lifecycle", () => {
  const task = createTask("  Preparar la API  ");

  try {
    assert.equal(task.title, "Preparar la API");
    assert.equal(task.status, "pending");
    assert.equal(findTaskById(task.id), task);
    assert.ok(
      listPendingTasks().some((pendingTask) => pendingTask.id === task.id),
    );
    assert.equal(completeTask(task.id).status, "completed");
    assert.equal(deleteTask(task.id), task);
    assert.equal(findTaskById(task.id), undefined);
  } finally {
    if (findTaskById(task.id)) {
      deleteTask(task.id);
    }
  }
});

test("rejects a blank task title", () => {
  assert.throws(() => createTask("   "), /obligatorio/);
});
