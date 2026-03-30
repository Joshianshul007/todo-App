const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const request = require('supertest');
const express = require('express');
const taskRoutes = require('../routes/taskRoutes');

let mongoServer;
const app = express();
app.use(express.json());
app.use('/api/tasks', taskRoutes);

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  if (mongoServer) {
    await mongoServer.stop();
  }
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany();
  }
});

describe('Task API Endpoints', () => {
  it('should create a valid task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Test Task', category: 'Work', dueDate: '2026-12-31' });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toBe('Test Task');
    expect(res.body.data.category).toBe('Work');
    expect(res.body.data.dueDate).toBeDefined();
    expect(res.body.data.completed).toBe(false);
  });

  it('should fail validation with an empty title', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: '' });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toContain('Please provide a title');
  });

  it('should get all tasks', async () => {
    await request(app).post('/api/tasks').send({ title: 'Task 1' });
    await request(app).post('/api/tasks').send({ title: 'Task 2' });

    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toBe(200);
    expect(res.body.count).toBe(2);
    expect(res.body.data.length).toBe(2);
  });

  it('should edit a task', async () => {
    const createRes = await request(app).post('/api/tasks').send({ title: 'Task 1' });
    const id = createRes.body.data._id;

    const res = await request(app)
      .put(`/api/tasks/${id}`)
      .send({ title: 'Updated Task 1', category: 'Personal' });

    expect(res.statusCode).toBe(200);
    expect(res.body.data.title).toBe('Updated Task 1');
    expect(res.body.data.category).toBe('Personal');
  });

  it('should mark a task as completed and prevent redundant completes', async () => {
    const createRes = await request(app).post('/api/tasks').send({ title: 'Complete Me' });
    const id = createRes.body.data._id;

    // First completion
    const completeRes = await request(app).put(`/api/tasks/${id}`).send({ completed: true });
    expect(completeRes.statusCode).toBe(200);
    expect(completeRes.body.data.completed).toBe(true);

    // Second completion (should fail gracefully)
    const redundantRes = await request(app).put(`/api/tasks/${id}`).send({ completed: true });
    expect(redundantRes.statusCode).toBe(400);
    expect(redundantRes.body.message).toContain('already marked as complete');
  });

  it('should delete a task', async () => {
    const createRes = await request(app).post('/api/tasks').send({ title: 'Delete Me' });
    const id = createRes.body.data._id;

    const deleteRes = await request(app).delete(`/api/tasks/${id}`);
    expect(deleteRes.statusCode).toBe(200);
    expect(deleteRes.body.message).toBe('Task removed');

    const getRes = await request(app).get('/api/tasks');
    expect(getRes.body.count).toBe(0);
  });
});
