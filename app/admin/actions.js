'use server';

import { prisma } from "@/lib/prisma";

export async function createUser(formData) {
  const name = formData.get('name');
  const phone = formData.get('phone');

  if (!name || !phone) return;

  await prisma.user.create({
    data: { name, phone },
  });
}

export async function getUsers() {
  const users = await prisma.user.findMany({
    orderBy: { id: 'desc' },
  });
  return users;
}
