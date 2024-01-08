import Elysia, { t } from 'elysia'

import db from '~/db'

const notesController = new Elysia({ prefix: 'notes' })
  .get('/', async () => {
    const notes = await db.note.findMany()

    return { ok: true, message: 'success', data: notes }
  })
  .post(
    '/',
    async ({ body }) => {
      try {
        const note = await db.note.create({
          data: body,
        })
        return {
          ok: true,
          message: 'created',
          data: note,
        }
      } catch (error: any) {
        return {
          ok: false,
          message: error?.message,
        }
      }
    },
    {
      body: t.Object({
        title: t.String(),
        description: t.String(),
      }),
    },
  )
  .get(
    '/:id',
    async ({ params: { id }, set }) => {
      try {
        const note = await db.note.findUnique({
          where: { id },
        })
        if (!note) {
          set.status = 404
          throw new Error('Note not found')
        }

        return { ok: true, message: 'success', data: note }
      } catch (error: any) {
        return {
          ok: false,
          message: error.message,
        }
      }
    },
    { params: t.Object({ id: t.Numeric() }) },
  )
  .put(
    '/:id',
    async ({ body, params: { id }, set }) => {
      try {
        const note = await db.note.findUnique({
          where: { id },
        })
        if (!note) {
          set.status = 404
          throw new Error('Note not found')
        }

        const result = await db.note.update({
          where: { id },
          data: body,
        })

        return {
          ok: true,
          message: 'updated',
          data: result,
        }
      } catch (error: any) {
        return {
          ok: false,
          message: error?.message,
        }
      }
    },
    {
      body: t.Object({
        title: t.String(),
        description: t.String(),
      }),
      params: t.Object({ id: t.Numeric() }),
    },
  )
  .delete(
    '/:id',
    async ({ params: { id }, set }) => {
      try {
        const note = await db.note.findUnique({
          where: { id },
        })
        if (!note) {
          set.status = 404
          throw new Error('Note not found')
        }

        await db.note.delete({
          where: { id },
        })
        return {
          ok: true,
          message: 'deleted',
        }
      } catch (error: any) {
        return {
          ok: false,
          message: error?.message,
        }
      }
    },
    {
      params: t.Object({ id: t.Numeric() }),
    },
  )

export default notesController
