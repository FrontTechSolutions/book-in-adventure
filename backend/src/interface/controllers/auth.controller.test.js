import request from 'supertest';
import mongoose from 'mongoose';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import app from '../../server';
import User from '../../../domain/user/User.model';

describe('POST /auth/register', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/bookinAdventure_test', { useNewUrlParser: true, useUnifiedTopology: true });
    await User.deleteMany({});
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  it('crée un compte client avec succès', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        email: 'client1@example.com',
        password: 'Test1234!',
        lastName: 'Client',
        firstName: 'Test',
        role: 'client'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.user.email).toBe('client1@example.com');
    expect(res.body.token).toBeDefined();
  });

  it('refuse la création si email déjà utilisé', async () => {
    await User.create({
      email: 'client2@example.com',
      password: 'hash',
      lastName: 'Dup',
      firstName: 'Test',
      role: 'client'
    });
    const res = await request(app)
      .post('/auth/register')
      .send({
        email: 'client2@example.com',
        password: 'Test1234!',
        lastName: 'Dup',
        firstName: 'Test',
        role: 'client'
      });
    expect(res.statusCode).toBe(409);
  });

  it('crée un compte pro avec succès', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        email: 'pro1@example.com',
        password: 'Test1234!',
        lastName: 'Pro',
        firstName: 'Test',
        phone: '0600000000',
        role: 'pro',
        companyName: 'MaBoite',
        companyAddress: '1 rue de la Paix',
        activityDescription: 'Yoga et bien-être'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.user.email).toBe('pro1@example.com');
    expect(res.body.user.role).toBe('pro');
    expect(res.body.token).toBeDefined();
  });

  it('refuse la création pro si champ requis manquant', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        email: 'pro2@example.com',
        password: 'Test1234!',
        lastName: 'Pro',
        firstName: 'Test',
        role: 'pro'
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toBeDefined();
  });
});
