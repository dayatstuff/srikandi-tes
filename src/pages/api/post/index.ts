import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

// POST /api/post
// Required fields in body: title, authorEmail
// Optional fields in body: content
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { title, content, authorEmail } = req.body
  let id = Date.now()
  const result = await prisma.post.create({
    data: {
      id: id,
      title: title,
      content: content,
      author: { connect: { email: authorEmail } },
    },
  })
  return res.status(201).json(result)
}
