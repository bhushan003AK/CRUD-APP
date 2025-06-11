'use server';

import { prisma } from "@/lib/prisma";

/**
 * Create a new user from formData (name and phone)
 */
export async function createUser(formData) {
  const name = formData.get('name');
  const phone = formData.get('phone');

  if (!name || !phone) return;

  await prisma.user.create({
    data: { name, phone },
  });
}

/**
 * Get all users ordered by ID descending
 */
export async function getUsers() {
  const users = await prisma.user.findMany({
    orderBy: { id: 'desc' },
  });
  return users;
}

/**
 * Update an existing user by ID using formData (name and phone)
 */
export async function updateUser(formData) {
  const id = formData.get('id');
  const name = formData.get('name');
  const phone = formData.get('phone');

  if (!id || !name || !phone) return;

  await prisma.user.update({
    where: { id },
    data: { name, phone },
  });
}

/**
 * Delete a user by ID
 */
export async function deleteUser(formData) {
  const id = formData.get('id');

  if (!id) return;

  await prisma.user.delete({
    where: { id },
  });
}
