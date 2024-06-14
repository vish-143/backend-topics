const request = require('supertest');
const app = require('../app');

describe('Employee Controller Tests', () => {
  const employeeId = 6
  // Test case for adding a new employee
  describe('POST /api/v1/employee/add', () => {
    it('should add a new employee', async () => {
      const response = await request(app)
        .post('/api/v1/employee/add')
        .send({
          FirstName: 'John',
          LastName: 'Doe',
          City: 'New York',
          Email: 'john.doe@example.com'
        });

      expect(response.statusCode).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();

    });

    // Test case for adding an employee with missing fields
    it('should return 400 if request body is empty', async () => {
      const response = await request(app)
        .post('/api/v1/employee/add')
        .send({});

      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  // Test case for getting all employees
  describe('GET /api/v1/employee/', () => {
    it('should retrieve all employees', async () => {
      const response = await request(app).get('/api/v1/employee/');

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();
    });
  });

  // Test case for getting an employee by ID
  describe('GET /api/v1/employee/:id', () => {
    it('should retrieve an employee by ID', async () => {
      const response = await request(app).get(`/api/v1/employee/${employeeId}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();
    });

    // Test case for getting an employee with an invalid ID
    it('should return 400 for invalid employee ID', async () => {
      const response = await request(app).get('/api/v1/employee/invalid_id');

      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
    });

    // Test case for getting an employee with a non-existent ID
    it('should return 404 for non-existent employee ID', async () => {
      const response = await request(app).get('/api/v1/employee/999999');

      expect(response.statusCode).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  // Test case for updating an employee
  describe('PATCH /api/v1/employee/:id', () => {
    it('should update an existing employee', async () => {
      const response = await request(app)
        .patch(`/api/v1/employee/${employeeId}`)
        .send({ City: 'Los Angeles' });

      expect(response.statusCode).toBe(201);
      expect(response.body.success).toBe(true);
    });

    // Test case for updating an employee with an invalid ID
    it('should return 400 for invalid employee ID', async () => {
      const response = await request(app)
        .patch('/api/v1/employee/invalid_id')
        .send({ City: 'Los Angeles' });

      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
    });

    // Test case for updating a non-existent employee
    it('should return 404 for non-existent employee ID', async () => {
      const response = await request(app)
        .patch('/api/v1/employee/999999')
        .send({ City: 'Los Angeles' });

      expect(response.statusCode).toBe(404);
      expect(response.body.success).toBe(false);
    });

    // Test case for updating an employee with an empty request body
    it('should return 400 if request body is empty', async () => {
      const response = await request(app)
        .patch(`/api/v1/employee/${employeeId}`)
        .send({});

      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  // Test case for deleting an employee
  describe('DELETE /api/v1/employee/:id', () => {
    it('should delete an existing employee', async () => {
      const response = await request(app).delete(`/api/v1/employee/${employeeId}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
    });

    // Test case for deleting an employee with an invalid ID
    it('should return 400 for invalid employee ID', async () => {
      const response = await request(app).delete('/api/v1/employee/invalid_id');

      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
    });

    // Test case for deleting a non-existent employee
    it('should return 404 for non-existent employee ID', async () => {
      const response = await request(app).delete('/api/v1/employee/999999');

      expect(response.statusCode).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });
});
